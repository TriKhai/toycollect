import { useAppDispatch } from "@/hooks/reduxHook";
import { navigate } from "@/hooks/useAppNavigate";
import { logOutAction } from "@/store/reducer/accountReducer";
import { clearOrders } from "@/store/reducer/userReducer";
import { CircleUser, LogOut } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderAdmin() {
  const dispatch = useAppDispatch();
  const logOutHandle = async () => {
    await dispatch(logOutAction());
    await dispatch(clearOrders());
    navigate("/login");
  };
  return (
    <div className="w-full flex justify-end mb-10">
      {/* <div className="w-[50vw] flex justify-center items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for a part-time job"
            className="w-full p-3 rounded-lg border placeholder-gray-500 border-[#8785A2] focus:outline-none focus:border-purple-500 text-white"
          />

          <button className="absolute right-3 top-2 px-4 py-1.5 bg-indigo-900 text-white rounded-lg text-sm cursor-pointer">
            Search
          </button>
        </div>
      </div> */}
      <div className="flex items-center gap-2">
        <div>
          <p className="text-black font-bold font-mono">
            Welcome to Administrator
          </p>
        </div>
        <NavLink
          to={"profile"}
          className="w-12 p-2 flex justify-center items-centersize-10 border rounded-sm border-black hover:outline-none hover:border-purple-500 cursor-pointer text-black"
        >
          <CircleUser />
        </NavLink>
        <button
          className="p-2 flex justify-center items-center size-11 border rounded-sm border-black hover:outline-none hover:border-purple-500 cursor-pointer text-black"
          onClick={logOutHandle}
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
}
