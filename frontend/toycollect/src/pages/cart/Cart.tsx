import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { createOrder } from "@/store/actions/orderAction";
import {
  CartItem,
  removeFromCart,
  updateQuantity,
} from "@/store/reducer/cartReducer";
import { RootState } from "@/store/store";
import { BadgeCheck, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/logo/toycollect_logo.png";
import { toast } from "sonner";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state: RootState) => state.cartReducer);
  const [query, setQuery] = useState("");
  const filterItems: CartItem[] =
    query.length > 0
      ? items.filter((item: CartItem) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        })
      : items;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlus = (id: number, quantity: number) => {
    const foundItem = items.find((item) => item.id == id); // Type: CartItem | undefined
    if (foundItem && foundItem.stock <= quantity) {
      toast.error("Product", {
        description: `quantity max!`,
      });
      return;
    }
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleMinus = (id: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleOrder = () => {
    const outOfStockItem = items.find((item) => item.quantity >= item.stock);

    if (outOfStockItem) {
      toast.error("Order Error", {
        description: `Product "${outOfStockItem.name}" exceeds available stock!`,
      });
      return;
    }
    // Map items (CartItem) to products (OrderProduct)
    const products = items.map(({ id, price, quantity }) => ({
      productId: id,
      price,
      quantity,
    }));
    // console.log(products);

    dispatch(createOrder({ products, purchaseMethod: "Online" }));
  };

  return (
    <div className=" my-10 ">
      <div className="flex gap-4">
        <h1 className="text-2xl mb-6 uppercase font-semibold underline">
          My Cart
        </h1>
        <div className="relative w-[30vw]">
          <input
            type="text"
            placeholder="Search for product's name"
            className="w-full p-2 rounded-md border placeholder-gray-500 border-[#8785A2] focus:outline-none focus:border-purple-500 text-black"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex w-[80vw] mx-autojustify-between">
        {filterItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center w-full my-25">
            <p className="text-2xl">Don't miss out—add to cart now!</p>
            <NavLink
              to={"/products"}
              className="border px-1 py-2 text-center rounded-2xl w-[20vw] hover:bg-[#DBE2EF]"
            >
              Products
            </NavLink>
          </div>
        ) : (
          <div className=" grid grid-cols-3 gap-4 mx-6 max-h-screen overflow-y-auto p-2">
            {filterItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col text-black w-full h-[45vh] border border-black/50 rounded-2xl p-4 cursor-pointer hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-full h-full p-4 overflow-hidden rounded-2xl">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:8080/product/files/${item.image}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = logo;
                    }}
                    alt={item.name}
                  />
                </div>
                <div className="w-full">
                  <div className="border-b mb-2">
                    <h1 className="text-black text-2xl font-semibold">
                      {item.name.length > 20
                        ? item.name.slice(0, 20) + "..."
                        : item.name}
                    </h1>
                    <p className="text-black text-lg">
                      Price: {formatPrice(item.price)} VNĐ
                    </p>
                  </div>

                  <div className="text-black flex justify-between w-full gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        className="hover:bg-green-200 cursor-pointer border rounded-full"
                        onClick={() => handleMinus(item.id, item.quantity)}
                      >
                        <Minus />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          if (item.stock <= item.quantity) {
                            toast.error("Product", {
                              description: `quantity max!`,
                            });
                            return;
                          }

                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: +e.target.value,
                            })
                          );
                        }}
                        className="border w-full px-2"
                      />

                      <button
                        className="hover:bg-green-200 cursor-pointer border rounded-full px-"
                        onClick={() => handlePlus(item.id, item.quantity)}
                      >
                        <Plus />
                      </button>
                    </div>

                    <button
                      className="border p-2 rounded-md hover:bg-red-400"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <Trash2 />{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div>
            <h2>Receipt</h2>
            <p className="text-xl font-semibold">
              Total: ${formatPrice(Number(totalPrice.toFixed(2)))}
            </p>
            <table className="table-auto text-left">
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="text-left border-t">
                    <td className="px-2">{item.name}</td>
                    <td className="px-2">x{item.quantity}</td>
                    <td className="px-2 text-right">
                      {formatPrice(item.quantity * item.price)}
                    </td>
                    <td>VNĐ</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="space-x-2">
              <button
                className="mt-4 px-4 py-2 bg-[#F57C9D] text-white rounded-lg flex gap-2 hover:bg-[#07AEC1]"
                onClick={() => {
                  handleOrder();
                }}
              >
                <span>Buy </span>
                <BadgeCheck />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
