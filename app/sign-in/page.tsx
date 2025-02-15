"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import notebookImage from "@/public/notebook-with-pencil.png";
import { signIn } from "next-auth/react"; // Import signIn from next-auth
import Link from "next/link";
import { useSession } from "next-auth/react"; // Use useSession hook for client-side session handling

interface Errors {
  username?: string;
}

export default function SignInPage() {
  const { data: session } = useSession(); // Get session data

  const [username, setUsername] = useState<string>("emilys");
  const [errors, setErrors] = useState<Errors>({});

  // Redirect if user is already logged in
  useEffect(() => {
    if (session) {
      window.location.href = "/post";
    }
  }, [session]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors: Errors = {};

    // Validate username input
    if (!username) {
      validationErrors.username = "Username is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Call signIn from next-auth
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password: username + "pass", // Use username + 'pass' as password for now
    });

    if (result?.error) {
      console.error("Login failed", result.error);
      setErrors({ username: "Invalid username or password" });
    } else {
      // Handle success (you can redirect or show a success message)
      // console.log("Logged in successfully", result);
      window.location.href = "/post";
    }
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="md:flex-col-reverse bg-[#243831] h-dvw min-h-screen">
      <div className="relative md:flex md:flex-row-reverse w-full h-full">
        <div className="bg-[#2B5F44] rounded-b-[24px] md:rounded-l-[36px] w-full md:max-w-[50%] lg:max-w-[632px] md:min-h-screen">
          <div className="flex md:flex-col justify-center items-center h-full min-h-[50dvh]">
            <div className="relative w-[299px] h-[230px]">
              <Link href="/">
                <Image
                  src={notebookImage}
                  alt="Notebook with pencil"
                  width={299}
                  height={230}
                  className="object-contain"
                />
              </Link>
            </div>
            <Link href="/">
              <p className="hidden md:block mt-7 font-['Castoro'] text-[28px] text-white italic">
                a Board
              </p>
            </Link>
          </div>
        </div>

        {/* Login form section */}
        <div className="flex flex-1 justify-center items-center px-4 min-h-[50dvh] md:min-h-screen">
          <div className="w-full min-w-[300px] sm:max-w-[340px] md:max-w-[384px] md:min-h-[300px]">
            <h1 className="mb-10 font-semibold text-white text-2xl">Sign in</h1>
            <div className="space-y-5">
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={handleChangeUsername}
                    placeholder="Username"
                    className="bg-[#F9F9F9] px-3.5 border border-[#DADADA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A569] w-full h-11 text-black text-base"
                  />
                  {errors.username && (
                    <p className="mt-2 text-red-500 text-sm">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogin} // Trigger login on click
                className="bg-[#49A569] hover:bg-[#3d8d59] shadow-sm rounded-lg w-full h-10 font-semibold text-white text-sm transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
