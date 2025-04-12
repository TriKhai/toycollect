import { Outlet } from "react-router-dom";
import TheHeader from "@/components/header/TheHeader.tsx";
import Footer from "@/components/footer/Footer";
import { Toaster } from "sonner";

export default function HomeTemplate() {
  return (
    <div className="h-full w-full bg-[#F9F5F6] ">
      <header>
        {" "}
        <TheHeader />{" "}
      </header>
      <hr />
      <div className="flex items-center justify-center">
        <Outlet />
      </div>
      <footer className="bg-[#DBE2EF]">
        <Footer />
      </footer>
      <Toaster richColors />
    </div>
  );
}
