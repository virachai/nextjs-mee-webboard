// app/components/Nav/Nav.tsx
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import UserButton from "./UserButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

// // Fetch the session server-side
// export async function getServerSideProps() {
//   const session = await getServerSession(authOptions);

//   return {
//     props: {
//       session,
//     },
//   };
// }

// interface NavProps {
//   session: CustomSession | null;
// }

export default async function Nav() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="top-0 z-10 sticky flex justify-between items-center bg-[#243831] px-4 md:px-8 py-3 w-full">
      {/* Logo / Text */}
      <Link href="/" className="font-serif text-white text-xl italic">
        a Board
      </Link>

      <div className="flex justify-end items-center gap-x-8 min-w-[250px]">
        <div className="-mr-3">
          {session?.user?.name ? (
            <span className="text-white">{session?.user?.name}</span>
          ) : (
            <span className="text-white">Guest</span>
          )}
        </div>
        <div className="-mr-3 md:mr-0">
          <UserButton />
        </div>
        <MobileNavbar />
      </div>
    </nav>
  );
}
