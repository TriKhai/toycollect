import { ReactNode } from "react";

interface Category {
  title: string;
  logo: ReactNode;
}

const categories: Category[] = [
  {
    title: "New",
    logo: <i className="fa-solid fa-gamepad"></i>,
  },
  {
    title: "Figure",
    logo: <i className="fa-solid fa-gamepad"></i>,
  },
  {
    title: "Creative",
    logo: <i className="fa-solid fa-gamepad"></i>,
  },
  {
    title: "Robot",
    logo: <i className="fa-solid fa-gamepad"></i>,
  },
  {
    title: "Games",
    logo: <i className="fa-solid fa-gamepad"></i>,
  },
  {
    title: "Vehicles",
    logo: <i className="fa-solid fa-gamepad"></i>,
  },
  {
    title: "Blind Box",
    logo: <i className="fa-solid fa-gamepad"></i>,
  },

  {
    title: "Blog",
    logo: <i className="fa-solid fa-gamepad"></i>,
  },
];

export default function Navbar() {
  return (
    <div className="flex items-center justify-center w-[50vw] mx-auto px-6 pb-2 gap-5">
      <div>
        <button className="border py-2 px-4 rounded-md text-black">
          Category
        </button>
      </div>
      <ul className="flex items-center gap-x-4 text-black">
        {categories.map((category: Category, index: number) => (
          <li
            key={index}
            className="px-3 border border-black rounded-md hover:border-purple-500 "
          >
            <a href="" className="flex flex-col">
              <span className="text-2xl text-center">{category.logo}</span>
              <span className="text-center whitespace-nowrap">
                {[category.title]}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
