import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
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
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-xl  mx-auto w-full p-3 ">
      {currentUser ? (
        <div className="flex gap-3  items-center my-5 text-gray-500 text-sm">
          <p>Signed In As</p>
          <img
            className="h-7 w-7 object-cover rounded-full "
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
            <p className="text-gray-200 text-xs">
              {200 - comment.length} characters left
            </p>
            <Button className="text-slate-200" color="blue" type="submit">
              Submit
            </Button>
          </div>
        </form>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {" "}
          {error}
        </Alert>
      )}
    </div>
  );
};
