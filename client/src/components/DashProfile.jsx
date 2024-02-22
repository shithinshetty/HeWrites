import {
  Alert,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice.js";
import { HiOutlineShieldExclamation } from "react-icons/hi";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export const DashProfile = () => {
  const [showmodal, setShowmodal] = useState(false);
  const dispatch = useDispatch();
  const [userStatus, setuserStatus] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) return;
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setuserStatus("User's Details Updated SuccessFully");
        {
          setTimeout(() => {
            setuserStatus(null);
          }, 3000);
        }
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  //deleteuser
  const handleDeleteUser = async () => {
    setShowmodal(false);
    try {
      dispatch(deleteUserStart);
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(deleteUserSuccess(data));
      } else {
        dispatch(deleteUserFailure(data.message));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  //SignOut
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Sign Out SuccessFull");
        dispatch(signOutSuccess(data));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl ">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="w-32 h-32 self-center cursor-pointer">
          {" "}
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full mx-auto w-full h-full object-cover border-8 border-[#545653]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        ></TextInput>
        <Button type="submit" color="blue" outline>
          Update
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              color="blue"
              className="dark:bg-blue-900 w-full"
            >
              Create A Post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-600 flex justify-between mt-5 ">
        <span onClick={() => setShowmodal(true)} className="cursor-pointer">
          {" "}
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          {" "}
          Get Out
        </span>
      </div>
      {userStatus && (
        <Alert color="success" className="mt-10">
          {userStatus}{" "}
        </Alert>
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
              Do you really want to delete 🥺🥹??
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes,I'm Sure
              </Button>
              <Button color="success" onClick={() => setShowmodal(false)}>
                Nope
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {error && (
        <Alert color="failure" className="mt-10">
          {error}{" "}
        </Alert>
      )}
    </div>
  );
};
