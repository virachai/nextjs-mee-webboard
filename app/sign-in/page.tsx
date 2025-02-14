"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import notebookImage from "@/public/notebook-with-pencil.png";

interface Errors {
  username?: string;
}

export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors: Errors = {};

    if (!username) {
      validationErrors.username = "Username is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Handle the login logic here
    console.log("Logging in with", username);
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  if (1)
    return (
      <div className="md:flex-col-reverse bg-[#243831] h-dvw min-h-screen">
        <div className="relative md:flex md:flex-row-reverse w-full h-full">
          <div className="bg-[#2B5F44] rounded-b-[24px] md:rounded-l-[36px] w-full md:max-w-[50%] lg:max-w-[632px] md:min-h-screen">
            <div className="flex md:flex-col justify-center items-center h-full min-h-[50dvh]">
              <div className="relative w-[299px] h-[230px]">
                <Image
                  src={notebookImage}
                  alt="Notebook with pencil"
                  width={299}
                  height={230}
                  className="object-contain"
                />
              </div>
              <p className="hidden md:block mt-7 font-['Castoro'] text-[28px] text-white italic">
                a Board
              </p>
            </div>
          </div>

          {/* Login form section */}
          <div className="flex flex-1 justify-center items-center px-4 min-h-[50dvh] md:min-h-screen">
            <div className="w-full min-w-[300px] sm:max-w-[340px] md:max-w-[384px] md:min-h-[300px]">
              <h1 className="mb-10 font-semibold text-white text-2xl">
                Sign in
              </h1>
              <div className="space-y-5">
                <div className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="bg-[#F9F9F9] px-3.5 border border-[#DADADA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A569] w-full h-11 text-black text-base"
                    />
                  </div>
                </div>
                <button className="bg-[#49A569] hover:bg-[#3d8d59] shadow-sm rounded-lg w-full h-10 font-semibold text-white text-sm transition-colors">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile home indicator */}
        {/* <div className="md:hidden bottom-0 left-0 absolute flex justify-center items-center w-full h-[34px]">
          <div className="bg-[#BBC2C0] rounded-full w-[134px] h-[5px]" />
        </div> */}
      </div>
    );

  if (0)
    return (
      <div className="flex justify-center items-center bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
          <h1 className="mb-4 font-bold text-2xl">Login Page</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 font-medium text-gray-700 text-sm"
              >
                Username:
                {errors.username && (
                  <p className="inline-block float-right mt-1 text-red-500 text-sm">
                    {errors.username}
                  </p>
                )}
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleChangeUsername}
                className={`w-full rounded-md border border-gray-300 p-2`}
                required
                pattern="\w{3,16}"
                title="Username: (3-16 characters)"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
}
