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
import { errorHandler } from "../../../api/utils/err";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState([]);
  const [showmore, setShowMore] = useState(true);
  const [showmodal, setShowmodal] = useState(false);
  const [commenttodelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();

        if (res.ok) {
          setComment(data.comments);

          if (data.comment.length < 9) {
            setShowMore(false);
          }
        }
        console.log(data.comment.length);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comment.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startindex=${startIndex}`
      );
      console.log(res);
      const data = await res.json();

      if (res.ok) {
        setComment((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    setShowmodal(false);
    try {
      const res = await fetch(`/api/comment/delete/${commenttodelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        return next(errorHandler(403, "You are not allowed to delete"));
      } else {
        setComment((prev) =>
          prev.filter((post) => post._id !== commenttodelete)
        );
        setShowmodal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll m-10 md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-900 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-950">
      {currentUser.isAdmin && comment.length > 0 ? (
        <>
          <Table hoverable className="shadow-md  ">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              <Table.HeadCell>Post Id</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>

            {comment.map((c) => (
              <Table.Body className="divide-y ">
                <Table.Row className="bg-white dark:border-gray-800 dark:bg-gray-900">
                  <Table.Cell>
                    {new Date(c.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{c.content}</Table.Cell>
                  <Table.Cell> {c.likes.length} </Table.Cell>
                  <Table.Cell>{c.postId}</Table.Cell>
                  <Table.Cell>{c.userId}</Table.Cell>

                  <Table.Cell>
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowmodal(true);
                        setCommentToDelete(c._id);
                      }}
                    >
                      Delete
                    </span>
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
        <p>You've got no comments</p>
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
              <Button color="failure" onClick={handleDeleteComment}>
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

export default DashComments;
