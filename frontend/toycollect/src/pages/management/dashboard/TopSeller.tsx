import React, { useEffect } from "react";
import avatar from "@/assets/avatar/avtchua.jpg";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchTopSeller } from "@/store/actions/orderAction";
import { RootState } from "@/store/store";
import { TopSeller } from "@/services/orderApi";

export default function TopSeller() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTopSeller());
  }, [dispatch]);
  const { topSellers } = useAppSelector(
    (state: RootState) => state.storeAdminReducer
  );

  return (
    <div className="flex flex-col gap-4">
      {topSellers.map((e: TopSeller) => (
        <div
          key={e.customer.id}
          className="p-2 bg-white flex rounded-lg items-center"
        >
          <div className="w-[80px] rounded-full overflow-hidden">
            <img
              src={e.customer.image ?? avatar}
              alt="Avatar"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-xl font-semibold">
              {e.customer.fullName ?? "Updating..."}
            </div>
            <div className="text-lg">
              Total purchase value: {e.totalRevenue.toFixed()} VNĐ
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
