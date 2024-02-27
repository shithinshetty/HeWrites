import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { HiOutlineDocumentText, HiUserCircle, HiUsers } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DashSidebar = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromURl = urlparams.get("tab");
    if (tabFromURl) {
      setTab(tabFromURl);
    }
  }, [location.search]);
  console.log(currentUser.isAdmin);
  const dispatch = useDispatch();
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
    <Sidebar className=" w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUserCircle}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="yellow"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiOutlineDocumentText}
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item active={tab === "users"} icon={HiUsers}>
                Users
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item onClick={handleSignOut} icon={FaSignOutAlt}>
            Get Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
