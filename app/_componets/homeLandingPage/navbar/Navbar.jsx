// components/Navbar.js

"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { RefreshCcwDot } from "lucide-react";

export default function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // console.log("Current Path:", pathname);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <Link
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/Logo.png" width={100} height={90} alt="l4it" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </Link>

        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          {pathname == "/dashboard" ? (
            <Link href="https://mailsync.l4it.net/l4mailapp/getmail.php">
              <div className="flex flex-row justify-center bg-indigo-400 p-3 rounded-2xl gap-2 hover:bg-gray-500 hover:text-white">
                <p className="font-semibold">Refresh </p>
                <RefreshCcwDot color="#3F51B5" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </nav>
  );
}
