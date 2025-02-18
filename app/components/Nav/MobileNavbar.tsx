// "use client";

// import { Menu } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/lib/authOptions";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/app/components/ui/dropdown-menu";

// import { links } from "./Navlinks.constant";
// import { v4 as uuidv4 } from "uuid";
// import { Session } from "next-auth";

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
//   session: Session | null;
// }

// export default function MobileNavbar() {
//   const session = await getServerSession(authOptions);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLinkClick = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div className="md:hidden top-0 right-0 bottom-0 left-0 z-50">
//       <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
//         <DropdownMenuTrigger asChild>
//           <div className="hover:bg-slate-700 p-1 rounded-sm text-gray-300 transition cursor-pointer">
//             <Menu />
//           </div>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent
//           className="top-0 right-0 fixed space-y-4 bg-[#243831] p-4 w-[260px] text-white"
//           align="end"
//           forceMount
//         >
//           {links.map((link) => (
//             <DropdownMenuItem key={link.id} className="cursor-pointer">
//               <Link
//                 href={link.href}
//                 className="flex flex-row items-stretch w-full"
//                 onClick={handleLinkClick}
//               >
//                 {link.icon && <link.icon className="mr-2 w-6 text-gray-300" />}
//                 <span className="text-base">{link.name}</span>
//               </Link>
//             </DropdownMenuItem>
//           ))}
//           {!session && (
//             <DropdownMenuItem key={uuidv4()} className="cursor-pointer">
//               <Link
//                 href="/sign-in"
//                 className="flex flex-row items-stretch w-full"
//                 onClick={handleLinkClick}
//               >
//                 <span className="text-base">Sign In</span>
//               </Link>
//             </DropdownMenuItem>
//           )}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }

"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react"; // Client-side session hook
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { links } from "./Navlinks.constant";
import { v4 as uuidv4 } from "uuid";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Use useSession to get session client-side

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
          className="top-0 right-0 fixed space-y-4 bg-[#243831] p-4 w-[260px] text-white"
          align="end"
          forceMount
        >
          {links.map((link) => (
            <DropdownMenuItem key={link.id} className="cursor-pointer">
              <Link
                href={link.href}
                className="flex flex-row items-stretch w-full"
                onClick={handleLinkClick}
              >
                {link.icon && <link.icon className="mr-2 w-6 text-gray-300" />}
                <span className="text-base">{link.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}

          {/* Check if the session is not null, and show Sign In if the session is null */}
          {!session && (
            <DropdownMenuItem key={uuidv4()} className="cursor-pointer">
              <Link
                href="/sign-in"
                className="flex flex-row items-stretch w-full"
                onClick={handleLinkClick}
              >
                <UserCircleIcon className="mr-2 w-6 text-gray-300" />
                <span className="text-base">Sign In</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
