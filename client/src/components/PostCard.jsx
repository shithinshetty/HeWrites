import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="group relative w-full  h-[350px] overflow-hidden rounded-lg sm:w-[430px]  transition-all bg-stone-400 dark:bg-stone-900">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[250px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-slate-500 text-teal-500 hover:bg-green-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
          to={`/post/${post.slug}`}
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
