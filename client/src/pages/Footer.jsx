import React from "react";
import blog from "../components/blog.svg";
import { data } from "autoprefixer";
const Footer = () => {
  return (
    <div>
      <footer class="bg-slate-200 rounded-lg shadow dark:bg-gray-900 ">
        <div class="w-full max-w-screen-xl mx-auto md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a
              href="/"
              class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={blog} class="h-12" alt="HeWrites Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                HeWrites
              </span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" class="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-3" />
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400 ">
            © {new Date().getFullYear()}{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              HeWrites™
              <br />
            </a>
            Made With ❤️ in Kudla. <br /> All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
