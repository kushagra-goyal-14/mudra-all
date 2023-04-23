import React from "react";
import { Link } from "react-router-dom";

import ImageLight from "../assets/img/login-office.jpeg";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import { Label, Input, Button } from "@windmill/react-ui";
import { useState } from "react";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(event) {
    try {
      event.preventDefault();
      console.log("hmm");
      let response = await fetch("http://localhost:4000/api/v1/signin", {
        method: "POST",
        body: JSON.stringify({
          email: username,
          password: password,
        }),
        headers: { "Content-Type": "application/JSON" },
        credentials: "include",
      });
      response = await response.json();
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("ResponseToken", response.data.token);
        window.location.href = "http://localhost:3000/app/dashboard";
      } else {
        alert("wrong credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={login}>
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <Label
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                >
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="email"
                  />
                </Label>

                <Label
                  className="mt-4"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                >
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                  />
                </Label>

                <Button className="mt-4" type="submit">
                  Log in
                </Button>
                <p className="mt-1 text-sm font-medium text-black-600 dark:text-white">
                  Dont havr an account?
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/create-account"
                  >
                    {" "}Create here
                  </Link>
                </p>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
