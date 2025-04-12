import ProductCard from "@/components/card/ProductCard";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { RootState } from "@/store/store";
import { fetchProducts } from "@/store/reducer/productReducer";
import { useEffect, useState } from "react";
import { Product } from "@/services/productApi";
import Pagination from "@/components/Pagination";

// TODO: size page chưa xử lí
export default function Products() {
  // State
  const [currentPage, setCurrentPage] = useState(0);
  const [sizePage, setSizePage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  const { productPage } = useAppSelector(
    (state: RootState) => state.productReducer
  );

  const dispatch = useAppDispatch();
  // Khi component mount và mỗi khi currentPage hoặc sizePage thay đổi, gọi API
  useEffect(() => {
    dispatch(fetchProducts(currentPage, sizePage));
  }, [dispatch, currentPage, sizePage]);

  // Cập nhật totalPages từ Redux mỗi khi productPage thay đổi
  useEffect(() => {
    if (productPage) {
      setTotalPages(productPage.totalPages);
    }
  }, [productPage]);

  return (
    <div className="h-screen flex flex-col items-center justify-center mx-36 gap-y-12 my-12 mt-20 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-2 xl:gap-10">
        {productPage.products.map((product: Product, index: number) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
