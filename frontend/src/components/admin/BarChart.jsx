import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const MyBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis dataKey="date" tick={{ fontSize: 18 }} />
        <YAxis tick={{ fontSize: 18 }} />
        <Tooltip cursor={false} />
        <Legend />
        <Bar
          dataKey="total"
          label={{ position: "top" }}
          fill="blue"
          barSize={105}
          radius={[100, 100, 0, 0]}
          fillOpacity={1}
          labelFormatter={(value) => `${value} Orders`}
          name="Total Sales"
          maxBarSize={1}
          minBarSize={1}
          stackId="1"
          isAnimationActive={true}
          animationDuration={1500}
          animationBegin={0}
          animationEasing="ease"
          animationEasingUpdate="ease"
          animationId="1"
          animationDurationUpdate={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
