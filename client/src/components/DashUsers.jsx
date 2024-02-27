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

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState([]);
  const [showmore, setShowMore] = useState(true);
  const [showmodal, setShowmodal] = useState(false);
  const [usertodelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        console.log(data.user);
        if (res.ok) {
          setUser(data.user);

          if (data.user.length < 9) {
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
  console.log(user.length);

  const handleShowMore = async () => {
    const startIndex = user.length;
    try {
      const res = await fetch(`api/user/getusers?startindex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => [...prev, ...data.user]);
        if (data.user.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      next(error);
    }
  };

  console.log(usertodelete);
  const handleDeletePost = async () => {
    setShowmodal(false);
    try {
      const res = await fetch(`/api/user/delete/${usertodelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        return next(errorHandler(403, "You are not allowed to delete"));
      } else {
        setUser((prev) => prev.filter((post) => post._id !== usertodelete));
        setShowmodal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll m-10 md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-900 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-950">
      {currentUser.isAdmin && user.length > 0 ? (
        <>
          <Table hoverable className="shadow-md  ">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
              <Table.HeadCell>Is Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>

            {user.map((post) => (
              <Table.Body className="divide-y ">
                <Table.Row className="bg-white dark:border-gray-800 dark:bg-gray-900">
                  <Table.Cell>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={post.profilePicture}
                      alt={post.username}
                      className="w-20 h-10 object-cover bg-grey-500"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {post.username.toUpperCase()}
                    {console.log(post.username.toUpperCase())}
                  </Table.Cell>
                  <Table.Cell>{post.isAdmin ? "✅" : "❌"}</Table.Cell>
                  <Table.Cell>
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowmodal(true);
                        setUserToDelete(post._id);
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
        <p>You've got no users</p>
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

export default DashUsers;
