"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface MenuItem {
  id: string;
  label: string;
}

export const tagData: MenuItem[] = [
  { id: "history", label: "History" },
  { id: "food", label: "Food" },
  { id: "pets", label: "Pets" },
  { id: "health", label: "Health" },
  { id: "fashion", label: "Fashion" },
  { id: "exercise", label: "Exercise" },
  { id: "others", label: "Others" },
];

const CommunityDropdown = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Community");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (itemId: string) => {
    const newSelectedItem = selectedItem === itemId ? "Community" : itemId;
    setSelectedItem(newSelectedItem);

    // Add selected tag to query parameters
    const params = new URLSearchParams(searchParams);
    if (newSelectedItem !== "Community") {
      params.set("tag", newSelectedItem);
    } else {
      params.delete("tag");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="inline-flex justify-between items-center hover:bg-gray-50 px-4 py-2 border border-gray-200 rounded-md focus:outline-none min-w-[140px] font-medium text-sm community_post">
        <span className="capitalize">{selectedItem}</span>
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white shadow-lg py-1 border border-gray-200 rounded-lg min-w-[220px]"
          sideOffset={5}
        >
          {tagData.map((item) => (
            <DropdownMenu.Item
              key={item.id}
              className={`flex items-center px-4 py-2 text-sm cursor-default select-none outline-none ${
                selectedItem === item.id
                  ? "bg-emerald-50 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onSelect={() => handleSelect(item.id)}
            >
              <span className="flex-grow">{item.label}</span>
              {selectedItem === item.id && (
                <Check className="w-4 h-4 text-emerald-600" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default CommunityDropdown;
