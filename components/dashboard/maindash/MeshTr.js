import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export function MessagingTrends() {
  const data = [
    { date: '2024-12-01', sent: 196093, delivered: 179715 },
    { date: '2024-12-02', sent: 147649, delivered: 139032 },
    // More data points
  ];

  return (
    <div className="card p-4">
      <h2 className="text-xl font-bold mb-4">Messaging Trends</h2>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sent" stroke="#8884d8" />
        <Line type="monotone" dataKey="delivered" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
