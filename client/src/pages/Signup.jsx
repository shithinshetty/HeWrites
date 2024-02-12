import { Alert, Spinner } from "flowbite-react";

import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setformData] = useState({});
  const [errmsg, setErrmsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrmsg("Enter All The Fields Brother");
    }
    try {
      setLoading(true);
      setErrmsg(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrmsg(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setErrmsg(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div class="mx-auto my-20 max-w-md rounded-3xl border px-4 py-10 text-gray-700 shadow-lg sm:px-8 place-content-center bg-slate-200">
        <div class="mb-16 flex justify-between">
          <span class="font-bold mx-1">
            <span class="inline-block h-3 w-3 bg-blue-600 "></span>
            HeWrites
          </span>
          <span class="">
            Have account?{" "}
            <Link
              to="/signin"
              class="font-medium text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </span>
        </div>
        <p class="mb-5 text-3xl font-medium">Want to Read?,SignUp!!!!</p>
        <form onSubmit={handleSubmit}>
          <div class="mb-6">
            <div class="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
              <input
                type="text"
                id="username"
                class="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
          </div>

          <div class="mb-6">
            <div class="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
              <input
                type="email"
                id="email"
                class="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="mb-6">
            <div class="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
              <input
                type="password"
                id="password"
                class="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            class="mb-6 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                {" "}
                <Spinner size="sm" />
                <span className="pl-3">Loading.....</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          <button class="  flex mb-6 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700">
            <FaGoogle className="size-5 my-1 mx-3 " />
            Sign In With Goggle
          </button>
        </form>
        <p class="">
          By signing up you are agreeing to Shithin's{" "}
          <a
            href="#"
            class="whitespace-nowrap font-medium text-gray-900 hover:underline"
          >
            Terms and Conditions
          </a>
        </p>
        {errmsg && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{errmsg}!</span>
          </Alert>
        )}
      </div>
    </>
  );
};

export default Signup;
