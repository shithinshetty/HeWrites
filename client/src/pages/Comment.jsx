import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function Comment({ comment, onLike }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
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
        </div>
      </div>
    </div>
  );
}
