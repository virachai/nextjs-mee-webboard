import { v4 as uuid } from "uuid";

type linkProps = {
  id: string;
  name: string;
  href: string;
};

export const links: linkProps[] = [
  { id: uuid(), name: "Home", href: "/" },
  { id: uuid(), name: "Our Blog", href: "/blog" },
];
