import { MyOrder } from "@/services/orderApi";
import React from "react";
import logo from "@/assets/logo/toycollect_logo.png";

type Props = {
  orders: MyOrder[];
};

export default function OrderList({ orders }: Props) {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-8  overflow-y-auto max-h-screen p-4">
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <div key={order.id} className="border p-4 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Order</h3>
              <p className="text-gray-700">
                Purchase Method: {order.purchaseMethod}
              </p>
              <p className="text-gray-700">Status: {order.status}</p>
              <p className="text-gray-700">
                Created At: {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700">
                Updated At: {new Date(order.updatedAt).toLocaleString()}
              </p>

              <h4 className="text-lg font-medium mt-4">Products:</h4>
              <ul className="mt-2 space-y-4">
                {order.products.map((product) => (
                  <li key={product.id} className="flex items-center gap-4">
                    <img
                      src={`http://localhost:8080/product/files/${product.image}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = logo;
                      }}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-black font-medium">{product.name}</p>
                      <p className="text-gray-600">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-gray-600">
                        Price: ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
