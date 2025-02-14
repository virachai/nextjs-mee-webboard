import { v4 as uuid } from "uuid";
import { PencilSquareIcon, HomeIcon } from "@heroicons/react/24/outline";

// Update the type to accept a React component
type linkProps = {
  id: string;
  name: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Updated type
};

export const links: linkProps[] = [
  { id: uuid(), name: "Home", href: "/", icon: HomeIcon },
  { id: uuid(), name: "Our Blog", href: "/blog", icon: PencilSquareIcon },
];
