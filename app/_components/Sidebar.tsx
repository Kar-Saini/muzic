"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col bg-card w-64 md:block p-4 border-r-2 border-gray-100">
      <h1 className="text-3xl font-bold mb-4">Muzic</h1>
      <nav className=" font-md flex flex-col gap-y-1">
        <SidebarButton title="Dashboard" href="/" enabled={pathname === "/"} />
        <SidebarButton
          title="All spaces"
          href="/spaces"
          enabled={pathname === "/spaces"}
        />
        <SidebarButton
          title="Profile"
          href="/profile"
          enabled={pathname === "/profile"}
        />
        <SidebarButton
          title="Stream"
          href="/stream"
          enabled={pathname === "/stream"}
        />
      </nav>
    </div>
  );
};

function SidebarButton({
  title,
  href,
  enabled,
}: {
  title: string;
  enabled: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`${!enabled && "hover:bg-gray-100"} py-2 px-4 rounded-lg ${
        enabled && "font-semibold bg-gray-50 "
      }`}
    >
      {title}
    </Link>
  );
}

export default Sidebar;
