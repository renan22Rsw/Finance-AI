"use client";

import { useState } from "react";
import { SidebarButton } from "./sidebar-button";
import { SidebarItems } from "./sidebar-items";
import { UserIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathName = usePathname();
  const { user } = useUser();

  console.log(pathName);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarButton
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onToggle={handleToggleSidebar}
      />

      <div
        className={`fixed left-0 top-0 z-50 h-screen w-[250px] transform rounded-md bg-[#0C0A09] py-4 transition-transform duration-300 ease-in-out md:w-[350px] ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="flex h-screen flex-col justify-between rounded-md bg-[#0C0A09] py-4">
          <div className="px-4 py-10">
            <span className="flex items-center gap-2 font-bold">
              <ChevronRight size={20} />
              Main Menu
            </span>
            <ul className="pt-8">
              {SidebarItems.map((item) => (
                <Link href={item.href} key={item.id}>
                  <li
                    className={`my-4 flex cursor-pointer items-center gap-2 rounded-md px-2 py-4 ${pathName === item.href ? "bg-zinc-800" : ""}`}
                  >
                    {item.icon} {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="h-[150px] space-y-4 px-4">
            <span className="flex items-center gap-2 font-bold">
              <UserIcon size={20} />
              Account
            </span>
            <div className="flex items-center gap-2">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-50 h-50",
                  },
                }}
              />
              <span className="font-semibold">
                {user?.firstName ? user?.firstName : user?.fullName}
              </span>
            </div>
            <Button asChild className="w-full">
              <SignOutButton />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
