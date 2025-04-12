import React from "react";

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

export default function TopSeller() {
  return (
    <div className="container">
      <Swiper spaceBetween={50} slidesPerView={3}>
        <SwiperSlide className="">
          <div className="w-36 h-36">
            <img
              className="w-full"
              src="http://themesflat.co/html/open9/assets/images/box-item/banner-09.jpg"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        ...
      </Swiper>
    </div>
  );
}
