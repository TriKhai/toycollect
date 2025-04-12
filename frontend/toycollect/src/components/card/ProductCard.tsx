import { useAppDispatch } from "@/hooks/reduxHook";
import { Product } from "@/services/productApi";
import { addToCart } from "@/store/reducer/cartReducer";
import { Sparkle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo/toycollect_logo.png";

type Props = {
  product: Product;
};

// TODO: Chưa xử lí load ảnh

export default function ProductCard({ product }: Props) {
  const { id, name, price, discount, image, stock } = product;
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    if (stock === 0) {
      toast.error("Product", {
        description: `${name} sold out!`,
      });
      return;
    }
    const newPrice = price - (price * discount) / 100;
    dispatch(
      addToCart({ id, name, price: newPrice, image, quantity: 1, stock })
    );
    toast.success("Product", {
      description: `${name} successfully added to your cart!`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <NavLink to={`/detail/${product.id}`}>
      <div className="border shadow-md rounded-2xl px-3 pt-3 pb-6 w-70 h-100 hover:-translate-y-3 transition-transform duration-500 group mx-auto ">
        <div className="rounded-xl overflow-hidden relative cursor-grab">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={`http://localhost:8080/product/files/${product.image}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = logo;
            }}
            alt="Product"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            className="cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#363333] text-white px-4 py-2 rounded-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100 hover:bg-[#12B0C2] shadow-sm"
          >
            Add
          </button>
        </div>
        <div className="border-b mt-1 px-1 space-y-1">
          <h3 className="h-14 text-xl font-bold text-balance line-clamp-2 text-black">
            {product.name}
          </h3>
          <div className="">
            <span className="text-lg text-[#F57090] line-through mr-2">
              {formatPrice(product.price)}
            </span>
            <span className="text-lg text-[#12B0C2] mr-1 ">
              {formatPrice(
                product.price - (product.price * product.discount) / 100
              )}
            </span>
            VNĐ
          </div>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="inline-block text-black">
            {product.stock + " - "}
            {product.stock > 0 ? "Available" : "Sold out"}
          </span>
          <div className="text-black">
            <Sparkle />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
