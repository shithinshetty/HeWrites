import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Header from "./pages/Header";
import Signup from "./pages/Signup";
import Footer from "./pages/Footer";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
