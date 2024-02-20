import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice.js";

export const DashProfile = () => {
  const dispatch = useDispatch();
  const [userStatus, setuserStatus] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
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
      </form>
      <div className="text-red-600 flex justify-between mt-5 ">
        <span className="cursor-pointer"> Delete Account</span>
        <span className="cursor-pointer"> Get Out</span>
      </div>
      {userStatus && (
        <Alert color="success" className="mt-10">
          {userStatus}{" "}
        </Alert>
      )}
    </div>
  );
};
