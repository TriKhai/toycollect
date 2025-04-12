import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchStatistic } from "@/store/reducer/storeAdminReducer";
import { RootState } from "@/store/store";
import { Item } from "@radix-ui/react-dropdown-menu";
import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { month: 1, totalOrders: 45, totalRevenue: 2500000 },
//   { month: 2, totalOrders: 0, totalRevenue: 0 },
//   { month: 3, totalOrders: 12, totalRevenue: 980000 },
//   { month: 4, totalOrders: 87, totalRevenue: 5600000 },
//   { month: 5, totalOrders: 23, totalRevenue: 1900000 },
//   { month: 6, totalOrders: 0, totalRevenue: 0 },
//   { month: 7, totalOrders: 65, totalRevenue: 7800000 },
//   { month: 8, totalOrders: 34, totalRevenue: 3200000 },
//   { month: 9, totalOrders: 0, totalRevenue: 0 },
//   { month: 10, totalOrders: 92, totalRevenue: 870000 },
//   { month: 11, totalOrders: 199, totalRevenue: 999999 },
//   { month: 12, totalOrders: 10, totalRevenue: 1250000 },
// ];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export default function StatisticsChart() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchStatistic());
  }, [dispatch]);
  let { statistics } = useAppSelector(
    (state: RootState) => state.storeAdminReducer
  );
  statistics = statistics.map((item) => ({
    ...item,
    monthName: monthNames[item.month - 1],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={statistics}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthName" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="totalOrders" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="totalRevenue" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
