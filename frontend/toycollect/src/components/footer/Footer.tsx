import logo from "@/assets/logo/toycollect_logo.png";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center px-20">
        <div className="border-b-1 flex justify-around pt-20 pb-5 gap-10 text-black">
          <div className="cursor-pointer">
            <a href="#">
              <img className="size-44" src={logo} alt="" />
            </a>
          </div>
          <div className="">
            <h1 className="text-xl font-bold mb-4">Address</h1>
            <ul className="space-y-3">
              <li className="">
                <a
                  href="https://maps.app.goo.gl/PvEnrQGBBP83vGkx5"
                  target="_blank"
                  className="flex hover:underline"
                >
                  <MapPin />
                  <span className="ml-2">
                    Khu II, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt
                    Nam
                  </span>
                </a>
              </li>
              <li className="">
                <a href="tel:0848041482" className="flex hover:underline">
                  <Phone />
                  <span className="ml-2">0848041482</span>
                </a>
              </li>
              <li className="">
                <a
                  href="mailto:khaib2207530@student.ctu.edu.vn"
                  className="flex hover:underline"
                >
                  <Mail />
                  <span className="ml-2">khaib2207530@student.ctu.edu.vn</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="">
            <h1 className="text-xl font-bold mb-4 ">Information</h1>
            <ul className="space-y-1">
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  About Us
                </a>
              </li>
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  Contact Information
                </a>
              </li>
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  Careers
                </a>
              </li>
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  Brand Story
                </a>
              </li>
            </ul>
          </div>

          <div className="">
            <h1 className="text-xl font-bold mb-4">Information</h1>
            <ul className="space-y-1">
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  About Us
                </a>
              </li>
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  Contact Information
                </a>
              </li>
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  Careers
                </a>
              </li>
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  Brand Story
                </a>
              </li>
            </ul>
          </div>

          <div className="">
            <h1 className="text-xl font-bold mb-4">Information</h1>
            <ul className="space-y-1">
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  About Us
                </a>
              </li>
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  Contact Information
                </a>
              </li>
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  Careers
                </a>
              </li>
              <li className="">
                <a
                  href=""
                  className="after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                >
                  Brand Story
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full py-10 px-20 flex items-center justify-between text-black">
          <div>Copyright &copy; 2025</div>
          <div className="space-x-4 text-[1rem] uppercase font-bold">
            <a href="" className="hover:text-[#10AFC2]">
              Privacy Policy
            </a>
            <a href="" className="hover:text-[#10AFC2]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
// Open9 | NFT Marketplace HTML Template
