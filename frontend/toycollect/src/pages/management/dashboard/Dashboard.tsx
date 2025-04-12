import { CircleUser, Package, ShoppingCart, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { ReactNode, useEffect } from "react";
import { fetchCountData } from "@/store/reducer/storeAdminReducer";
import { RootState } from "@/store/store";
import StatisticsChart from "./StatisticsChart";
import TopSeller from "./TopSeller";

export interface Field {
  title: string;
  subTile: string;
  data: number;
  icon: ReactNode;
}

export default function DashBoard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCountData());
  }, [dispatch]);
  const { countData } = useAppSelector(
    (state: RootState) => state.storeAdminReducer
  );

  const fields: Field[] = [
    {
      title: "Total Orders",
      subTile: `Revenue: ${Math.round(countData?.totalRevenues ?? 0)} VNĐ`,
      data: countData?.totalOrder ?? 0,
      icon: <ShoppingCart />,
    },
    {
      title: "Total Products",
      subTile: `Sold/Stock: ${countData?.totalProductSold} / ${countData?.totalProductInStock}`,
      data: countData?.totalProduct ?? 0,
      icon: <Package />,
    },
    {
      title: "Total Accounts",
      subTile: "",
      data: countData?.totalAccount ?? 0,
      icon: <CircleUser />,
    },
    {
      title: "Total Brands",
      subTile: "",
      data: countData?.totalAccount ?? 0,
      icon: <Users />,
    },
  ];

  return (
    <div className="min-h-[500px] w-full text-black py-10 space-y-5">
      <div className="mx-10">
        <div className="flex flex-col">
          <div className="grid grid-cols-4 font-mono gap-8">
            {fields.map((field, index) => (
              <div key={index} className="p-5 rounded-lg bg-white shadow-md">
                <div className="flex justify-between">
                  <h1 className="text-xl">{field.title}</h1>
                  {field.icon}
                </div>
                <div>
                  <span className="text-black text-2xl font-bold">
                    {field.data}
                  </span>
                </div>
                <div>{field.subTile}</div>
              </div>
            ))}
          </div>

          <div className="my-10 grid grid-cols-3 gap-8 ">
            <div className="col-start-1 col-end-3 h-[60vh] ">
              <h1 className="text-black font-bold">Monthly Revenue Chart</h1>
              <StatisticsChart />
            </div>

            <div>
              <h3 className="text-black font-bold mb-3">Top Seller</h3>
              <TopSeller />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
