"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

interface SidebarButtonProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onToggle: () => void;
}

export const SidebarButton = ({
  isOpen,
  onOpenChange,
  onToggle,
}: SidebarButtonProps) => {
  const handleToggleSidebar = () => {
    onOpenChange(!isOpen);
    onToggle();
  };

  return (
    <div className="flex w-full justify-between p-6">
      <div>
        <Image
          src={"/logo.svg"}
          width={150}
          height={150}
          alt="finance-ai"
          priority
        />
      </div>
      <Button onClick={handleToggleSidebar}>
        <Menu />
      </Button>
    </div>
  );
};
