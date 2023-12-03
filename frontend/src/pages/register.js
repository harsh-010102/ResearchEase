import { Link } from "react-router-dom";
import React, { useState } from "react";
// import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const register = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const json_res = await response.json();
      console.log(json_res);

      if (response.status === 201) {
        navigate("/");
      }
      if (response.status === 409){
        alert("User-name already exist")
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
  function toggleConfirmPasswordVisibility() {
    const passwordInput = document.getElementById("confirm-password");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  return (
    <div>
      <nav className="bg-white w-full border-gray-200 ">
        <div className="flex flex-wrap items-center justify-between mx-10 p-4">
          <span className="self -center text-2xl font-semibold whitespace-nowrap text-indigo-600">
            ResearchEase
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
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
          <div className="hidden w-full md:block  md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 "
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>{" "}
      <div className="mx-auto my-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg ">
          {/* <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              Login
            </h1> */}
        </div>
        <div>
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
              <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                Welcome!!
              </h1>

              <form
                onSubmit={register}
                className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
              >
                <p className="text-center text-lg font-medium">Register</p>
                <div>
                  <label for="name" className="sr-only">
                    Name
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      className="w-full placeholder-gray-900 bg-indigo-100 border-solid border-2 border-indigo-600 rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label for="email" className="sr-only">
                    Email
                  </label>

                  <div className="relative">
                    <input
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="w-full placeholder-gray-900 bg-indigo-100 border-solid border-2 border-indigo-600 rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter Email"
                      required
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
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
                  <label for="password" className="sr-only">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="passwordInput"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="w-full placeholder-gray-900 bg-indigo-100 border-solid border-2 border-indigo-600 rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter Password"
                      required
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <button onClick={togglePasswordVisibility}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
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

                <div>
                  <label for="confirm-password" className="sr-only">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      id="confirm-password"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="w-full placeholder-gray-900 bg-indigo-100 border-solid border-2 border-indigo-600 rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Confirm Password"
                      required
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <button onClick={toggleConfirmPasswordVisibility}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
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
                  className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                >
                  Register
                </button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account &#160;
                  <a className="underline" href="/">
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
