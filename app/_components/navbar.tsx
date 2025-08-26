"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "../hooks/use-mobile";
import { Sidebar } from "./sidebar";

const NavBar = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <Sidebar />
      ) : (
        <nav className="boder-b flex justify-between border-solid px-8 py-4">
          <div className="flex items-center gap-10">
            <Image
              src={"/logo.svg"}
              width={173}
              height={39}
              alt="finance-ai"
              priority
            />
            <div className="hidden sm:flex sm:gap-8">
              <Link
                href={"/"}
                className={
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                }
              >
                Dashboard
              </Link>
              <Link
                href={"/transactions"}
                className={
                  pathname === "/transactions"
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              >
                Transações
              </Link>
              <Link
                href={"/subscription"}
                className={
                  pathname === "/subscription"
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              >
                Assinaturas
              </Link>
            </div>
          </div>

          <UserButton showName />
        </nav>
      )}
    </>
  );
};

export default NavBar;
