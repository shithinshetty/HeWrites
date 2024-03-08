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
          Here, you'll discover a treasure trove of insightful articles covering
          a wide array of topics. Dive into the fascinating world of web
          development, where you'll unravel the latest trends, techniques, and
          tools shaping the digital landscape. Delve deep into the realm of
          software engineering, exploring the intricacies of crafting robust and
          scalable solutions to complex problems. Unleash your coding prowess as
          we explore various programming languages, from the fundamentals to
          advanced concepts, empowering you to build innovative applications
          with confidence. But that's not all! My blog is a hub for knowledge
          seekers, offering insights into algorithms, data structures, and much
          more. Whether you're a seasoned developer seeking to expand your
          skills or a curious enthusiast eager to explore the wonders of
          technology, you'll find something to captivate your mind and fuel your
          passion. So, join us on this exhilarating journey as we embark on a
          quest for knowledge, innovation, and inspiration.{" "}
          <span className="text-white">Welcome aboard!</span>
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
              className="text-lg font-semibold text-lime-300 hover:underline text-center"
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
