import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: '1', value: 120 },
  { name: '2', value: 130 },
  { name: '3', value: 125 },
  { name: '4', value: 140 },
  { name: '5', value: 150 },
  { name: '6', value: 160 },
  { name: '7', value: 140 },
  { name: '8', value: 135 },
];

const LineChartComponent = () => {
  return (
    <div className="flex justify-center">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
