import React, { useEffect, useState } from "react";
import moment from "moment";
export default function Comment({ comment }) {
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
      </div>
    </div>
  );
}
