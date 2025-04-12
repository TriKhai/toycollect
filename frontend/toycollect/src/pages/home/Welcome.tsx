// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import banner8 from "@/assets/banner/banner-08.jpg";
import banner9 from "@/assets/banner/banner-09.jpg";
import banner10 from "@/assets/banner/banner-10.jpg";
import banner11 from "@/assets/banner/banner-11.jpg";
import banner12 from "@/assets/banner/banner-12.jpg";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import { NavLink } from "react-router-dom";

interface Card {
  image: string;
}

const cards: Card[] = [
  {
    image: banner8,
  },
  {
    image: banner9,
  },
  {
    image: banner10,
  },
  {
    image: banner11,
  },
  {
    image: banner12,
  },
  {
    image: banner9,
  },
];

export default function Welcome() {
  return (
    <div className="grid grid-cols-2 py-12">
      <div className="flex flex-col items-center py-20 pl-[15rem] gap-8">
        <h1 className="text-5xl font-bold uppercase  text-balance text-black animate-slideInLeft">
          Discover the World of Toys
        </h1>
        <p className="text-lg text-balance animate-fadeInUp text-black">
          Bringing you creative, safe, and colorful toys for your little ones!
          From action figures and dolls to remote-controlled cars and
          educational toys – find everything at **ToyCollect**
        </p>
        <div className="flex w-full gap-4">
          <button className="px-10 py-3 bg-amber-200 text-lg font-semibold rounded-xl text-black">
            Get start
          </button>
          <NavLink
            to={"products"}
            className="px-10 py-3 bg-green-400 text-lg font-semibold rounded-xl text-black"
          >
            Products
          </NavLink>
        </div>
      </div>
      <div>
        <Swiper
          className="gap-9\"
          effect="coverflow"
          grabCursor={true}
          spaceBetween={-545}
          slidesPerView={1}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2.5,
            slideShadows: false,
            scale: 0.9,
          }}
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
        >
          {cards.map((card: Card, index: number) => (
            <SwiperSlide key={index} className="relative group ">
              <div className="group shrink-0 w-[456px] h-[560px]  xl:h-lg xl:w-md relative overflow-hidden rounded-2xl">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={card.image}
                  alt=""
                />
                <button className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gray-500 p-2 rounded-lg hover:bg-green-600">
                  Hover Me
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
