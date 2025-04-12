import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { Promotion } from "@/services/promotionApi";
import {
  deleteVoucher,
  fetchPromotions,
} from "@/store/actions/promotionAction";
import { openModal } from "@/store/reducer/modalReducer";
import { setVoucher } from "@/store/reducer/promotionReducer";
import { RootState } from "@/store/store";
import { format, isBefore } from "date-fns";
import { Info, PackagePlus, Trash2 } from "lucide-react";

import React, { useEffect, useState } from "react";

export default function VouchersPage() {
  const dispatch = useAppDispatch();
  const { promotions } = useAppSelector(
    (state: RootState) => state.promotionReducer
  );

  useEffect(() => {
    dispatch(fetchPromotions());
  }, []);

  const [query, setQuery] = useState("");

  const filterVouchers: Promotion[] =
    query.length > 0
      ? promotions.filter((promotion: Promotion) => {
          return promotion.name.toLowerCase().includes(query.toLowerCase());
        })
      : promotions;

  const handleAdd = () => {
    dispatch(
      openModal({
        title: "FORM ADD VOUCHER",
        componentName: "ADD_VOUCHER",
      })
    );
  };

  const handleEdit = (promotion: Promotion) => {
    dispatch(setVoucher(promotion));
    dispatch(
      openModal({
        title: "FORM EDIT VOUCHER",
        componentName: "EDIT_VOUCHER",
      })
    );
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteVoucher(id));
    dispatch(fetchPromotions());
  };
  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-md mb-6 flex gap-x-4">
        <div>
          <button
            className="p-2 border rounded-md flex gap-2 hover:bg-[#13B2C4] hover:text-white"
            onClick={handleAdd}
          >
            <PackagePlus />
            <span>Add Voucher</span>
          </button>
        </div>
        <div>
          <div className="relative w-[30vw]">
            <input
              type="text"
              placeholder="Search for voucher's name ..."
              className="w-full p-2 rounded-md border placeholder-gray-500 border-[#8785A2] focus:outline-none focus:border-[#0BAFC1] text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 font-mono gap-8 max-h-[70vh] overflow-y-auto w-full px-3">
        {filterVouchers
          .slice()
          .reverse()
          .map((promotion) => (
            <div
              key={promotion.id}
              className="p-5 rounded-lg bg-white text-black shadow-md relative"
            >
              <div className="flex justify-between">
                <h1 className="text-xl font-semibold">{promotion.name}</h1>
              </div>
              <div>
                <p>{promotion.description}</p>
              </div>
              <div>
                <span className="text-black text-2xl font-bold">
                  +{promotion.percent}%
                </span>
              </div>
              <div
                className={`text-right ${
                  isBefore(new Date(promotion.endDate), new Date())
                    ? "text-red-500"
                    : ""
                }`}
              >
                <p>
                  End At: {format(new Date(promotion.endDate), "yyyy-MM-dd")}
                </p>
              </div>

              <div className="space-x-2 absolute top-3 right-3">
                <button
                  className="hover:text-[#15B3C4] text-black"
                  onClick={() => handleEdit(promotion)}
                >
                  <Info />
                </button>
                <button
                  className="hover:text-[#F78BA9] text-black"
                  onClick={() => handleDelete(promotion.id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
