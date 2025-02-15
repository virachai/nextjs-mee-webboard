// app/components/Nav/Nav.tsx
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import UserButton from "./UserButton";

export default function Nav() {
  return (
    <nav className="top-0 z-10 sticky flex justify-between items-center bg-[#243831] px-4 md:px-8 py-3 w-full">
      {/* Logo / Text */}
      <Link href="/" className="font-serif text-white text-xl italic">
        a Board
      </Link>

      <div className="flex items-center gap-x-8">
        <MobileNavbar />
        <UserButton />
      </div>
    </nav>
  );
}
