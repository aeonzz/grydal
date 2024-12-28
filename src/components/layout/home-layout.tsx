import React from "react";
import { NavBar } from "../navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="">
      <NavBar />
      {children}
    </div>
  );
}
