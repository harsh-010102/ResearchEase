import { Link } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const checkLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const a = await response.json();
      console.log(a);
      if (response.status === 200) {
        const cookie = new Cookies();
        const exdate = new Date();
        cookie.set("token", a.token, {
          path: "/",
        });
        navigate("/home");
      } else {
        alert("Email and Password are incorrect");
      }
    } catch (error) {
      console.log(error);
    }
  };
  function togglePasswordVisibility() {
    const passwordInput = document.getElementById("passwordInput");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  return (
    <div>
      <nav class="bg-white w-full border-gray-200 ">
        <div class="flex flex-wrap items-center justify-between mx-10 p-4">
          <span class="self -center text-2xl font-semibold whitespace-nowrap text-indigo-600">
            ResearchEase
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div class="hidden w-full md:block  md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="#"
                  class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 "
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="mx-auto my-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg ">
          {/* <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Login
          </h1> */}
        </div>
        <div>
          <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-lg">
              <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                Welcome!!
              </h1>

              <form
                onSubmit={checkLogin}
                class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
              >
                <p class="text-center text-lg font-medium">
                  Login in to your account
                </p>

                <div>
                  <label for="email" class="sr-only">
                    Email
                  </label>

                  <div class="relative">
                    <input
                      type="email"
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      class="w-full bg-indigo-100 placeholder-gray-900 border-gray-200 border-solid border-2 border-indigo-600 rounded-lg  p-4 pe-12 text-sm shadow-sm text-grey-900"
                      placeholder="Enter Email"
                    />

                    <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label for="password" class="sr-only">
                    Password
                  </label>

                  <div class="relative">
                    <input
                      type="password"
                      id="passwordInput"
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      class="w-full bg-indigo-100 placeholder-gray-900 border-solid border-2 border-indigo-600 rounded-lg p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter Password"
                    />
                    <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <button onClick={togglePasswordVisibility}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                >
                  Sign in
                </button>

                <p class="text-center text-sm text-gray-600">
                  Not having an account?&#160;
                  <Link class="underline" to="/register">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
