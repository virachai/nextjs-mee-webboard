// app/components/Nav/Nav.tsx
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import MobileNavbar from "./MobileNavbar";

export default function Nav() {
  return (
    <nav className="top-0 z-10 sticky flex justify-between items-center bg-[#243831] px-4 md:px-8 py-3 w-full">
      {/* Logo / Text */}
      <Link href="/" className="font-serif text-white text-xl italic">
        a Board
      </Link>

      <MobileNavbar />

      {/* Sign In Button */}
      <Button className="hidden md:flex bg-[#49A569] hover:bg-[#45a049] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] px-6 py-2 rounded-md text-white">
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </nav>
  );
}
