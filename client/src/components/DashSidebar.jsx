import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromURl = urlparams.get("tab");
    if (tabFromURl) {
      setTab(tabFromURl);
    }
  }, [location.search]);
  return (
    <Sidebar className=" w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUserCircle}
              label={"User"}
              labelColor="yellow"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={FaSignOutAlt} label={"User"} labelColor="yellow">
            Get Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
