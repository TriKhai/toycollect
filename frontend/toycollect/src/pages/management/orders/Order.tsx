import { MyOrder } from "@/services/orderApi";
import React from "react";
import { format } from "date-fns";
import { approveOrder, getOrders } from "@/store/actions/orderAction";
import { useAppDispatch } from "@/hooks/reduxHook";
import logo from "@/assets/logo/toycollect_logo.png";

type Props = {
  order: MyOrder;
};

export default function Order({ order }: Props) {
  const dispatch = useAppDispatch();
  const handleApproved = async (id: number, status: string) => {
    if (status === "Pending") {
      await dispatch(approveOrder(id));
      await dispatch(getOrders());
    }
  };

  return (
    <div
      key={order.id}
      className=" rounded-2xl p-6 shadow-lg bg-white h-[50vh] "
    >
      <div className="flex justify-between items-centerb-4">
        <h2 className="text-xl font-semibold">Order #{order.id}</h2>

        <span
          className={`cursor-pointer px-4 py-1 rounded-full text-white ${
            order.status === "Pending"
              ? "bg-yellow-500 hover:bg-red-300"
              : "bg-green-400"
          }`}
          onClick={() => {
            handleApproved(order.id, order.status);
          }}
        >
          {order.status}
        </span>
      </div>

      <p className="text-gray-600 mb-2">
        Purchase Method: <strong>{order.purchaseMethod}</strong>
      </p>

      <p className="text-gray-600 mb-2">
        Customer: <strong>{order.customer.fullName}</strong>
      </p>

      <p className="text-gray-600 mb-4">
        Created At: {format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}
      </p>

      <p className="text-gray-600 mb-4">
        Update At: {format(new Date(order.updatedAt), "yyyy-MM-dd HH:mm")}
      </p>

      <div className="space-y-4 max-h-[100px] xl:max-h-[150px] 2xl:max-h-[12vw] 3xl:max-h-[300px] max-w-[20vw]  overflow-y-auto">
        {order.products.map((product) => (
          <div
            key={product.id}
            className="flex items-center border-b pb-4 last:border-b-0"
          >
            <img
              src={`http://localhost:8080/product/files/${product.image}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = logo;
              }}
              alt={product.name}
              className="w-16 h-auto  rounded-lg object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
