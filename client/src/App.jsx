import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Header from "./pages/Header";
import Signup from "./pages/Signup";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminOnlyPrivateRoute from "./components/AdminOnlyPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import Post from "./pages/Post";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            {" "}
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<AdminOnlyPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path="/post/:postSlug" element={<Post />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
