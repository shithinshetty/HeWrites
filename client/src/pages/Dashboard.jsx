import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import { DashProfile } from "../components/DashProfile";
import DashPost from "../components/DashPost";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";

const Dashboard = () => {
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[url('components\wallpaper.jpg')] bg-cover">
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === "profile" && <DashProfile />}
      {/* Postsss... */}
      {tab === "posts" && <DashPost />}
      {/* Users */}
      {tab === "users" && <DashUsers />}
      {/* Comments */}
      {tab === "comments" && <DashComments />}
    </div>
  );
};

export default Dashboard;
