import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/services/productApi";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Scrollbar } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  products: Product[];
};

export default function NewProducts({ products }: Props) {
  return (
    <div className="relative my-10 overflow-x-hidden">
      <h2 className="text-3xl font-bold text-center w-full underline">
        Latest Products
      </h2>

      {/* Swiper */}
      <Swiper
        className="gap-9 my-4"
        effect="creative"
        grabCursor={true}
        slidesPerView={4} // Số lượng sản phẩm hiển thị
        centeredSlides={true}
        spaceBetween={-300}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay, Scrollbar]}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        scrollbar={{ draggable: true }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="relative text-black">
            <div className="p-10">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="custom-next absolute -right-15 top-2/4 z-10 border text-black p-3 rounded-full hover:bg-[#12B0C2] hover:text-white">
        <ArrowRight />
      </button>

      <button className="custom-prev absolute -left-15 top-2/4 z-10  border text-black p-3 rounded-full hover:bg-[#12B0C2] hover:text-white">
        <ArrowLeft />
      </button>
    </div>
  );
}
