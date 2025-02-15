"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { DropdownMenuItem } from "@/app/components/ui/dropdown-menu";

export default function UserSignOutButton() {
  return (
    <DropdownMenuItem
      onClick={() => signOut()}
      className="flex items-center gap-2 cursor-pointer"
    >
      <LogOut size={16} /> <span>Sign out</span>
    </DropdownMenuItem>
  );
}
