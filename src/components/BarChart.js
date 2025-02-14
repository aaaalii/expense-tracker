import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Chart({data, date = false}){
  const aggregatedData = data.reduce((acc, curr) => {
    const existingEntry = (acc.find(item => item.date === curr.date));
    if (existingEntry) {
      existingEntry.amount = Number(existingEntry.amount) + Number(curr.amount);
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  return (
    <>
      <ResponsiveContainer height='100%' className='chart-bg text-light pt-2 rounded'>
        <BarChart
          width={500}
          height={300}
          data={date ? aggregatedData : data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={date ? 'date' : 'title'}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" type="number" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}