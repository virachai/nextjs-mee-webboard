"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import { links } from "./Navlinks.constant";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden top-0 right-0 bottom-0 left-0 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div className="hover:bg-slate-700 p-1 rounded-sm text-gray-300 transition cursor-pointer">
            <Menu />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="top-0 right-0 fixed space-y-4 bg-[#243831] p-4 w-[280px] text-white"
          align="end"
          forceMount
        >
          {links.map((link) => (
            <DropdownMenuItem key={link.id} className="cursor-pointer">
              <Link
                href={link.href}
                className="w-full"
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
