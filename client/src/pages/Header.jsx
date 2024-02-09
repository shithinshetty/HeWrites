import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaMoon } from "react-icons/fa6";

const Header = () => {
  return (
    <Navbar className="border-b-4 mb-6 mt-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-slate-300"
      >
        <div className=" px-3 py-3 bg-gradient-to-br from-green-400 to-purple-700 rounded-3xl text-slate-200">
          HeWrites
        </div>
      </Link>
      <form>
        {" "}
        <TextInput
          type="text"
          placeholder="🔍 Search..."
          className="hidden lg:inline "
        />{" "}
      </form>
      <Button className="w-20 h-10 bg-purple-400 lg:hidden" color="black">
        <IoSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline bg-slate-800 rounded-2xl"
          pill
        >
          <FaMoon />
        </Button>{" "}
        <Link to="/sign-in">
          <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...">
            Sign In
          </Button>
        </Link>
      </div>{" "}
    </Navbar>
  );
};

export default Header;
