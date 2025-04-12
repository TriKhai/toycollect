import Welcome from "./Welcome";
import ProductCard from "@/components/card/ProductCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import NewProducts from "./NewProducts";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchLastestProducts } from "@/store/actions/productAction";
import Type from "./Type";

export default function Home() {
  const dispatch = useAppDispatch();
  const { lastestProducts } = useAppSelector(
    (state: RootState) => state.productReducer
  );
  useEffect(() => {
    dispatch(fetchLastestProducts());
  }, []);
  return (
    <div className="container mx-auto">
      <Welcome />
      <NewProducts products={lastestProducts} />
      <Type />
    </div>
  );
}
