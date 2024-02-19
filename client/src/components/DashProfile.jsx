import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

export const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl ">Profile</h1>
      <form className="flex flex-col gap-10">
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
        ></TextInput>
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="password"
        ></TextInput>
        <Button type="submit" color="blue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-600 flex justify-between mt-5 ">
        <span className="cursor-pointer"> Delete Account</span>
        <span className="cursor-pointer"> Get Out</span>
      </div>
    </div>
  );
};
