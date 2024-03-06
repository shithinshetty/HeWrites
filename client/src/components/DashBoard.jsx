import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashBoard() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComment, setLastMonthComment] = useState(0);
  const [lastMonthPost, setLastMonthPost] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.user);
          setTotalUsers(data.userCount);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPost(data.lastMonthPost);
        }
      } catch (error) {}
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.commentCount);
          setLastMonthComment(data.lastMonthComment);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
      fetchPost();
      fetchUsers();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center ">
        <div className="flex flex-col p-3 bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl text-slate-300">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600  text-stone-200 rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-indigo-500">Last month</div>
          </div>
        </div>

        <div className="flex flex-col p-3 bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl text-slate-300">{totalComments}</p>
            </div>
            <FaComments className="bg-rose-600  text-stone-200 rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComment}
            </span>
            <div className="text-indigo-500">Last month</div>
          </div>
        </div>

        <div className="flex flex-col p-3 bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl text-slate-300">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-amber-600  text-stone-200 rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPost}
            </span>
            <div className="text-indigo-500">Last month</div>
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>

            <Link to={"/dashboard?tab=users"}>
              <Button outline gradientDuoTone="greenToBlue">
                See All{" "}
              </Button>
            </Link>
          </div>

          <Table hoverable>
            <TableHead>
              <TableHeadCell>User image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
            </TableHead>
            {console.log(Boolean(users))}
            {users &&
              users.map((u) => (
                <TableBody key={u._id} className="divide-y">
                  <TableRow className="border-gray-700 bg-gray-900">
                    <TableCell>
                      <img
                        src={u.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </TableCell>
                    <TableCell>{u.username}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full h-full md:w-auto shadow-md p-2 rounded-md bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Link to={"/dashboard?tab=comments"}>
              <Button outline gradientDuoTone="greenToBlue">
                See All{" "}
              </Button>
            </Link>
          </div>

          <Table hoverable>
            <TableHead>
              <TableHeadCell>Content</TableHeadCell>
              <TableHeadCell>Number Of Likes</TableHeadCell>
            </TableHead>
            {console.log(Boolean(comments))}
            <TableBody>
              {comments &&
                comments.map((comment) => (
                  <TableRow
                    key={comment._id}
                    className="border-gray-700 bg-gray-900"
                  >
                    <TableCell>{comment.content}</TableCell>
                    <TableCell>{comment.likes.length}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Link to={"/dashboard?tab=posts"}>
              <Button outline gradientDuoTone="greenToBlue">
                See All{" "}
              </Button>
            </Link>
          </div>

          <Table hoverable>
            <TableHead>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
            </TableHead>

            <TableBody>
              {posts &&
                posts.map((p) => (
                  <TableRow key={p._id} className="border-gray-700 bg-gray-900">
                    <TableCell>
                      <img
                        src={p.image}
                        alt="image"
                        className="w-14 h-12 rounded-md bg-gray-500"
                      />
                    </TableCell>
                    <TableCell className="w-96">{p.title}</TableCell>
                    <TableCell className="w-7">{p.category}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
