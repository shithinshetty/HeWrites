import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CommentSection } from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function Post() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
        } else {
          setPost(data.posts[0]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();

        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-4xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4l ">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category} `}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post.image}
        alt={post.title}
        className="mt-10 p-3 max-h-[500px] w-full  object-cover"
      />
      <div className="flex justify-between p-3 border-b-4 border-slate-500 ">
        <span className="italic font-semibold dark:text-red-600">
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="italic font-semibold dark:text-red-700">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post && post.content }}
        className="p-3 post-content   mx-auto w-full  m-5"
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CommentSection postId={post._id} />
      </div>
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent Articles</h1>
        <div className="flex  gap-5 mt-5 justify-center ">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
