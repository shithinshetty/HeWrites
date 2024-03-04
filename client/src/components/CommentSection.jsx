import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { errorHandler } from "../../../api/utils/err";
import Comment from "../pages/Comment";

export const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [commentslist, setCommentsList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    if (comment.length === 0) {
      setError("Enter Something Brother!!!");
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setError(null);
        setCommentsList([data, ...commentslist]);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);

        if (res.ok) {
          const data = await res.json();
          setCommentsList(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await fetch(`/api/comment/like/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setCommentsList(
          commentslist.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setCommentsList(
      commentslist.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto w-full p-3 ">
      {currentUser ? (
        <div className="flex gap-3 items-center my-5 text-gray-500 text-sm">
          <p>Signed In As</p>
          <img
            className="h-7 w-7 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            className="text-xs text-red-600 font-semibold"
            to={`/dashboard?tab=profile`}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div>
          You must be signed in to comment
          <Link
            className="h-4 w-6 bg-orange-500 rounded-md font-semibold p-2 m-3 text-black"
            to={"/signin"}
          >
            {" "}
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border-2 border-slate-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <TextInput
            placeholder="Add A Comment..."
            rows="6"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-slate-700 dark:text- text-xs">
              {200 - comment.length} characters left
            </p>
            <Button className="text-slate-200" color="blue" type="submit">
              Submit
            </Button>
          </div>
          {error && (
            <Alert color="failure" className="mt-5">
              {" "}
              {error}
            </Alert>
          )}
        </form>
      )}

      {commentslist.length === 0 ? (
        <p className="text-sm my-5">No comments Yet</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-slate-900 py-1 px-2 rounded-sm">
              <p>{commentslist.length}</p>
            </div>
          </div>
          {commentslist.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
            />
          ))}
        </>
      )}
    </div>
  );
};
