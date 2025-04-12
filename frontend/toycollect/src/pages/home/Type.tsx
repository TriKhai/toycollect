import { Atom, Cat } from "lucide-react";
import { ReactNode } from "react";
import logo1 from "@/assets/brand/lego.png";
import logo2 from "@/assets/brand/hasbro.png";
import logo3 from "@/assets/brand/bandai.png";

interface Choice {
  logo: ReactNode;
  title: string;
  subTitle: string;
  price: number;
  shadowClass: string;
}

const choices: Choice[] = [
  {
    title: "EGO Sets",
    subTitle:
      "Build, create, and explore with LEGO’s iconic and innovative construction sets.",
    price: 299,
    logo: <img src={logo1} alt="" className="size-20" />,
    shadowClass: "shadow-[-1.5rem_-1.5rem_0_0_#FFFBEC]",
  },
  {
    title: "Hasbro Action Figures",
    subTitle:
      "Collect and play with high-quality figures from Transformers, Marvel, and more.",
    price: 299,
    logo: <img src={logo2} alt="" className="size-20" />,
    shadowClass: "shadow-[-1.5rem_-1.5rem_0_0_#F9ECFF]",
  },
  {
    title: "Bandai Model Kits",
    subTitle:
      "Premium model kits including Gunpla, anime figures, and limited-edition collectibles.",
    price: 299,
    logo: <img src={logo3} alt="" className="size-20" />,
    shadowClass: "shadow-[-1.5rem_-1.5rem_0_0_#ECEEFF]",
  },
];

export default function Type() {
  return (
    <div className="rounded-3xl bg-[#F4F3FA] p-20 space-y-12 my-10 shadow">
      <div>
        <h1 className="text-center text-3xl font-bold text-balance">
          Top Brands
        </h1>

        <p className="text-lg mt-6 text-center text-balance">
          Bring joy and creativity to every child with our high-quality, safe,
          and fun toys – because every little moment of play shapes a lifetime
          of happiness!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {choices.map((choice: Choice, index: number) => (
          <div
            key={index}
            className={`p-10 rounded-xl bg-white ${choice.shadowClass}`}
          >
            <div className="flex justify-center">{choice.logo}</div>

            <h3 className="text-lg font-bold">{choice.title}</h3>
            <p className="text-sm">{choice.subTitle}</p>
            {/* <div className="flex items-center">
              <span className="font-bold text-2xl">{choice.price},-</span>
              <span className="text-sm">/month</span>
            </div> */}
            <div className="flex justify-center">
              <button className="mt-6 rounded-full border-[1px] px-4 py-2 border-[#F0F0F6] bg-[#F0F0F6] shadow-[0px_4px_0px_0px_#E7E7FB]">
                Get now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="rounded-full bg-blue-950 text-white px-4 py-2">
          See all
        </button>
      </div>
    </div>
  );
}
