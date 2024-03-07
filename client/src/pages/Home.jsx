import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="bg-home-wallpaper bg-cover">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto  ">
        <h1 className="text-3xl flex font-bold lg:text-6xl justify-center text-white">
          Welcome To My Blog
        </h1>
        <p className="text-gray-500 text-lg  font-serif flex flex-wrap ">
          Here you'll find a variety of articles on topics such as web
          development, software engineering, and programming
          languages,algorithms and many more.
        </p>
        <Link
          to="/search"
          className="text-sm sm:text-md text-emerald-400 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <motion.div
        animate={{ x: [0, 100, 0] }}
        className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7"
      >
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6 ">
            <h2 className="text-2xl font-semibold text-center text-white ">
              Recent Posts
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg font-semibold text-rose-900 hover:underline text-center"
            >
              View All Posts
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
