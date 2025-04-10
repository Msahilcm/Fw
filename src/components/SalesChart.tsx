import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface SalesData {
  month: string;
  sales: number;
  visitors: number;
}

const data: SalesData[] = [
  { month: 'Jan', sales: 4000, visitors: 2400 },
  { month: 'Feb', sales: 3000, visitors: 1398 },
  { month: 'Mar', sales: 2000, visitors: 9800 },
  { month: 'Apr', sales: 2780, visitors: 3908 },
  { month: 'May', sales: 1890, visitors: 4800 },
  { month: 'Jun', sales: 2390, visitors: 3800 },
  { month: 'Jul', sales: 3490, visitors: 4300 },
];

const SalesChart: React.FC = () => {
  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4" id="sales-chart-title">
        Monthly Sales Performance
      </h2>
      <div className="w-full h-80" role="img" aria-labelledby="sales-chart-title">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: 'Month', position: 'insideBottom', offset: -10 }}
            />
            <YAxis
              label={{
                value: 'Amount ($)',
                angle: -90,
                position: 'insideLeft',
                offset: 10
              }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
              formatter={(value: number) => [`$${value}`, '']}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="sales"
              name="Sales"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="visitors"
              name="Visitors"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>* Data shown is for demonstration purposes only</p>
      </div>
    </div>
  );
};

export default SalesChart; 