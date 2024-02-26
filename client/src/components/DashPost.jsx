import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TableRow,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showmore, setShowMore] = useState(false);
  const [showmodal, setShowmodal] = useState(false);
  const [posttodelete, setPostToDelete] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        next(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  console.log(currentUser.isAdmin);
  console.log(userPosts.length);
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      next(error);
    }
  };
  console.log(userPosts.length);
  const handleDeletePost = async () => {
    setShowmodal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${posttodelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== posttodelete)
        );
      }
    } catch (error) {
      next(error);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll m-10 md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-900 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-950">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md  ">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {console.log(userPosts.image)}

            {userPosts.map((post) => (
              <Table.Body className="divide-y ">
                <Table.Row className="bg-white dark:border-gray-800 dark:bg-gray-900">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-grey-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium dark:text-yellow-200 "
                      to={`/post/${post.slug}`}
                    >
                      {post.title.toUpperCase()}
                      {console.log(post.title.toUpperCase())}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowmodal(true);
                        setPostToDelete(post._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-400 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showmore && (
            <Button
              className=" text-teal-700 self-center text-sm m-3 mx-auto"
              onClick={handleShowMore}
            >
              Show More
            </Button>
          )}
        </>
      ) : (
        <p>You've got no posts</p>
      )}
      <Modal
        show={showmodal}
        onClose={() => setShowmodal(false)}
        popup
        size="md"
        className="bg-slate-100"
        color="black"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center ">
            <FaExclamationTriangle className="h-14 w-14 text-red-600 dark:text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-3xl mb-5 text-slate-900 dark:text-blue-600">
              Do you really want to delete??
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes,I'm Sure
              </Button>
              <Button color="success" onClick={() => setShowmodal(false)}>
                Nope
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DashPost;
