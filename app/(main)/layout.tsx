import React from "react";
import Appbar from "../_components/Appbar";
import Sidebar from "../_components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex w-full">
      <Sidebar />
      <div className="w-full p-4">
        <Appbar />
        {children}
      </div>
    </div>
  );
};

export default layout;
