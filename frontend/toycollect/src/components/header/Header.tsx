import logo from "@/assets/logo/toycollect_logo.png";
import { CircleUser, LogOut, ShoppingCart } from "lucide-react";

import { useAppSelector } from "@/hooks/reduxHook";
import { RootState } from "@/store/store";
import { LogIn } from "lucide-react";
import { useAppDispatch } from "@/hooks/reduxHook";
import { logOutAction } from "@/store/reducer/accountReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { clearOrders } from "@/store/reducer/userReducer";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { username, token } = useAppSelector(
    (state: RootState) => state.accountReducer
  );

  const logOutHandle = async () => {
    await dispatch(logOutAction());
    await dispatch(clearOrders());
    navigate("/login");
  };

  const navLinks = [
    { path: "", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about-us", label: "About Us" },
  ];

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "active text-[#12B0C2] after:w-full" : ""}`;

  const renderLoginUI = () => {
    if (token) {
      return (
        <div className="space-x-2 flex justify-center items-center ">
          <div>
            <p className="text-black font-bold font-mono">
              Hello {username ? username : ""}!
            </p>
          </div>
          <NavLink
            to={"profile"}
            className="p-2 flex justify-center items-centersize-10 border rounded-sm border-black hover:outline-none hover:border-purple-500 cursor-pointer text-black"
          >
            <CircleUser />
          </NavLink>
          <NavLink
            to={"cart"}
            className="p-2 flex justify-center items-center size-10 border rounded-sm border-black hover:outline-none hover:border-purple-500 cursor-pointer text-black"
          >
            <ShoppingCart />
          </NavLink>
          <button
            className="p-2 flex justify-center items-center size-10 border rounded-sm border-black hover:outline-none hover:border-purple-500 cursor-pointer text-black"
            onClick={logOutHandle}
          >
            <LogOut />
          </button>
        </div>
      );
    }
    return (
      <div className="space-x-2 flex justify-center items-center ">
        <NavLink
          className="p-2 flex justify-center items-centersize-10 border rounded-sm border-black hover:outline-none hover:border-purple-500 cursor-pointer text-black "
          to={"login"}
        >
          <LogIn />
        </NavLink>
      </div>
    );
  };
  return (
    <div className="flex items-center justify-around px-6 ">
      <div className="cursor-pointer">
        <NavLink to={""}>
          <img className="size-20" src={logo} alt="" />
        </NavLink>
      </div>
      <div className="w-[50vw] px-16 flex justify-center items-center">
        {/* <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for a part-time job"
            className="w-full p-3 pl-10 rounded-lg border border-[#8785A2] focus:outline-none focus:border-purple-500 text-gray-600"
          />

          <button className="absolute right-3 top-2 px-4 py-1.5 bg-indigo-900 text-white rounded-lg text-sm cursor-pointer">
            Search
          </button>
        </div> */}
        <div className="text-black relative w-full" id="navbarNav">
          <ul className="flex gap-4">
            {navLinks.map(({ path, label }) => (
              <li key={path} className="text-xl font-bold hover:text-[#12B0C2]">
                <NavLink className={getLinkClass} to={path}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-x-2 flex justify-center items-center ">
        {renderLoginUI()}
      </div>
    </div>
  );
}
