import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaExclamationTriangle, FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleUpdate = async (req, res, next) => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };
  const handleSave = async (req, res, next) => {
    try {
      const res = await fetch(`/api/comment/edit/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex p-4 border-2 dark:border-gray-600 text-sm rounded-full mb-2">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-600"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-slate-500 text-sm">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2 rounded-lg resize-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex gap-3 justify-start text-xs">
              <Button
                type="button"
                size="xs"
                gradientDuoTone="tealToLime"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="xs"
                outline
                gradientMonochrome="failure"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 dark:text-slate-200 pb-2">
              {comment.content}
            </p>
            <div className="flex item-center pt-3 text-xs border-t dark:border-slate-400  gap-2">
              <button
                className={`hover:text-blue-700  text-slate-900 dark:text-slate-400 dark:hover:text-red-600 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-700 dark:!text-red-600"
                }`}
                type="button"
                onClick={() => onLike(comment._id)}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-slate-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    "" +
                    (comment.numberOfLikes == 1 ? "Like" : "Likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <div className="flex  gap-3">
                    <button
                      onClick={handleUpdate}
                      className="text-lime-500 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete(comment._id);
                      }}
                      className="text-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
