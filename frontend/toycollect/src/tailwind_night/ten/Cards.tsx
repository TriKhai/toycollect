// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

interface Card {
  image: string;
}

const cards: Card[] = [
  {
    image:
      "http://themesflat.co/html/open9/assets/images/box-item/banner-09.jpg",
  },
  {
    image:
      "https://dz3we2x72f7ol.cloudfront.net/expansions/prismatic-evolutions/en-us/SV8pt5_EN_82.png",
  },
  {
    image:
      "https://dz3we2x72f7ol.cloudfront.net/expansions/prismatic-evolutions/en-us/SV8pt5_EN_141.png",
  },
  {
    image:
      "http://themesflat.co/html/open9/assets/images/box-item/banner-09.jpg",
  },
  {
    image:
      "https://dz3we2x72f7ol.cloudfront.net/expansions/prismatic-evolutions/en-us/SV8pt5_EN_82.png",
  },
  {
    image:
      "https://dz3we2x72f7ol.cloudfront.net/expansions/prismatic-evolutions/en-us/SV8pt5_EN_141.png",
  },
];

export default function Cards() {
  return (
    <div className="grid grid-cols-2 py-12 px-48">
      <div className="flex flex-col items-center py-20 pl-[15rem] gap-8">
        <h1 className="text-5xl font-bold uppercase  text-balance">
          Discover the World of Toys
        </h1>
        <p className="text-lg text-balance">
          Bringing you creative, safe, and colorful toys for your little ones!
          From action figures and dolls to remote-controlled cars and
          educational toys – find everything at **ToyCollect**
        </p>
        <div className="flex w-full gap-4">
          <button className="px-10 py-3 bg-amber-200 text-lg font-semibold rounded-xl">
            Get start
          </button>
          <button className="px-10 py-3 bg-green-400-200 text-lg font-semibold rounded-xl">
            Products
          </button>
        </div>
      </div>
      <div>
        <Swiper
          className="gap-9\"
          effect="coverflow"
          grabCursor={true}
          spaceBetween={-585}
          slidesPerView={1}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
        >
          {cards.map((card: Card, index: number) => (
            <SwiperSlide key={index} className="relative group ">
              <div className="group shrink-0 h-xl w-md relative overflow-hidden rounded-2xl">
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
