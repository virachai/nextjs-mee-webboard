"use client";

import NavLinks from "@/app/components/ui/homepage/nav-links";
import { signOut } from "next-auth/react";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react"; // Use useSession hook for client-side session handling
import { Button } from "@/app/components/ui/button";

export default function SideNav() {
  const { data: session } = useSession(); // Get session data

  return (
    <div className="hidden md:flex flex-col px-8 md:px-6 py-4 h-full">
      <div className="flex flex-row md:flex-col justify-between space-x-2 md:space-x-0 md:space-y-2 grow">
        <NavLinks />
        <div className="hidden md:block rounded-md w-full h-auto grow"></div>
        <Button
          onClick={() => session && signOut()}
          className="flex md:flex-none justify-center md:justify-start items-center gap-2 bg-gray-50 hover:bg-sky-100 p-3 md:p-2 md:px-3 rounded-md w-full h-[48px] font-medium hover:text-blue-600 text-sm grow"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </Button>
      </div>
    </div>
  );
}
