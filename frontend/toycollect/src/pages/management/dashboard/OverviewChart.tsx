import { Card, CardContent } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 4500 },
  { month: "Mar", revenue: 4700 },
  { month: "Apr", revenue: 1800 },
  { month: "May", revenue: 3900 },
  { month: "Jun", revenue: 6000 },
  { month: "Jul", revenue: 2100 },
  { month: "Aug", revenue: 3100 },
  { month: "Sep", revenue: 3500 },
  { month: "Oct", revenue: 5800 },
  { month: "Nov", revenue: 1500 },
  { month: "Dec", revenue: 4000 },
];

export default function OverviewChart() {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Overview</h2>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" tickFormatter={(value) => `$${value}`} />
            <Bar dataKey="revenue" fill="#60A5FA" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
