import HeaderAdmin from "@/components/header/HeaderAdmin";
import SideBar from "@/components/sidebar/SideBar";
import { Toaster } from "sonner";
import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

export default function ManagementTemplate({}: Props) {
  return (
    <div className="h-screen w-full bg-[#F9F5F6] text-black">
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full px-10 pt-10">
          <HeaderAdmin />
          <Outlet />
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
}
