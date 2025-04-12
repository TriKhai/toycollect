import React from "react";
import logo from "@/assets/logo/toycollect_logo.png";
import { NavLink } from "react-router-dom";
import {
  CircleUser,
  LayoutDashboard,
  PackageOpen,
  ReceiptText,
  Store,
  TicketCheck,
  Users,
} from "lucide-react";

export default function SideBar() {
  const navLinks = [
    { path: "/admin", label: "Dashboard", icon: <LayoutDashboard /> },
    { path: "store", label: "Store", icon: <Store /> },
    { path: "accounts", label: "Accounts", icon: <CircleUser /> },
    { path: "orders", label: "Orders", icon: <ReceiptText /> },
    { path: "vouchers", label: "Vouchers", icon: <TicketCheck /> },
    { path: "brands", label: "Brands", icon: <Users /> },
    { path: "types", label: "Type Product", icon: <PackageOpen /> },
  ];

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex gap-2 ${isActive ? "active text-[#12B0C2]" : ""}`;

  return (
    <div className="h-screen w-[15vw] bg-white text-black flex flex-col justify-between px-5">
      {/* Logo */}
      <div>
        <div className="cursor-pointer border-b flex justify-center py-2 mb-4">
          <img className="size-20" src={logo} alt="Toy Collect Logo" />
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          {navLinks.map(({ path, label, icon }) => (
            <div className="text-xl" key={path}>
              <NavLink
                to={path}
                end={path === "/admin"} // Chỉ Dashboard mới có "end"
                className={getLinkClass}
              >
                {icon}
                {label}
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t py-2 text-center">© 2025 ToyCollect</div>
    </div>
  );
}
