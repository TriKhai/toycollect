import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { getOrders } from "@/store/actions/orderAction";
import { RootState } from "@/store/store";

import React, { useEffect } from "react";
import Order from "./Order";

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(
    (state: RootState) => state.storeAdminReducer
  );
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <div className="p-8">
      <div className="space-y-6 grid grid-cols-4 gap-4 max-h-[80vh] p-2 overflow-y-auto">
        {[...orders].reverse().map((order) => (
          <div className="" key={order.id}>
            <Order order={order} />
          </div>
        ))}
      </div>
    </div>
  );
}
