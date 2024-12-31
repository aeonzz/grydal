import React from "react";
import { NavBar } from "../navbar";
import Search from "../search";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-0 -z-20 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-15 blur-[100px]"></div>
      <NavBar>
        <Search showOnNavbar />
      </NavBar>
      {children}
    </div>
  );
}
