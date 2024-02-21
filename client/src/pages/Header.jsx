import React from "react";
import { Avatar, Button, Dropdown, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaMoon } from "react-icons/fa6";
import { Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { FaSun } from "react-icons/fa";
import { signOutSuccess } from "../redux/user/userSlice";
const Header = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;

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
    <Navbar className="border-b-4  bg-slate-200 ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-slate-300"
      >
        <div className=" flex px-3 py-3 bg-blue-600 rounded-3xl text-slate-200">
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
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </Button>{" "}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar img={currentUser.profilePicture} alt="user" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Get Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... font-semibold"
              outline
            >
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>{" "}
      <Navbar.Collapse>
        <Navbar.Link href="/" active={path === "/"} as={"div"}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about" active={path === "/about"} as={"div"}>
          About
        </Navbar.Link>

        <Navbar.Link href="/contact" active={path === "/contact"} as={"div"}>
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
