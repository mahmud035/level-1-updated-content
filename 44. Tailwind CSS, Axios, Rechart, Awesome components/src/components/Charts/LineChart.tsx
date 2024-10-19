import { LineChart as LChart, Line } from 'recharts';

const data = [
  { id: 1, name: 'Alice', math: 65, physics: 75, chemistry: 85 },
  { id: 2, name: 'Bob', math: 78, physics: 83, chemistry: 85 },
  { id: 3, name: 'Charlie', math: 92, physics: 89, chemistry: 94 },
  { id: 4, name: 'David', math: 74, physics: 76, chemistry: 72 },
  { id: 5, name: 'Eve', math: 88, physics: 82, chemistry: 87 },
  { id: 6, name: 'Frank', math: 91, physics: 90, chemistry: 93 },
  { id: 7, name: 'Grace', math: 80, physics: 84, chemistry: 78 },
  { id: 8, name: 'Hank', math: 95, physics: 92, chemistry: 96 },
  { id: 9, name: 'Ivy', math: 87, physics: 79, chemistry: 85 },
  { id: 10, name: 'Jack', math: 82, physics: 77, chemistry: 80 },
];

export default function LineChart() {
  return (
    <div className="w-full py-10">
      <h4 className="py-4 text-2xl">A demo of TinyLineChart:</h4>

      <LChart width={600} height={400} data={data} className="mx-auto">
        <Line type="monotone" dataKey="math" stroke="#581c87" />
        <Line type="monotone" dataKey="physics" stroke="#4c1d95" />
        <Line type="monotone" dataKey="chemistry" stroke="#701a75" />
      </LChart>
    </div>
  );
}
