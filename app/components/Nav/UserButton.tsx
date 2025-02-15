import { getServerSession } from "next-auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { authOptions } from "@/app/lib/authOptions";
import UserSignOutButton from "./UserSignOutButton";
import Link from "next/link";

// Define the type for the user in the session
interface CustomUser {
  id: number;
  name: string;
  email: string;
  image: string;
}

export default async function UserButton() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <Button className="hidden md:flex bg-[#49A569] hover:bg-[#45a049] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] px-6 py-2 rounded-md text-white">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </>
    );
  }

  // Assuming the session object has the correct structure now
  const user = session.user as CustomUser;
  const avatarSrc = user?.image || "/avatar.png";
  const userShortName = user?.name ? user?.name.slice(0, 2) : "anonymous";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative rounded-sm size-10">
          <Avatar className="rounded-sm size-10">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback className="rounded-sm uppercase">
              {userShortName}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="top-0 right-0 fixed bg-[#243831] p-4 w-[280px] text-white"
        align="end"
        forceMount
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-2">
            <p className="font-medium text-sm leading-none">
              {user?.name || userShortName}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email || "mail@exam.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <UserSignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
