import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function Radarchart() {
    const data = [
        {
          subject: 'EV Charge',
          A: 120,
          B: 110,
          fullMark: 150,
        },
        {
          subject: 'AC',
          A: 98,
          B: 130,
          fullMark: 150,
        },
        {
          subject: 'Plug Loads',
          A: 86,
          B: 130,
          fullMark: 150,
        },
        {
          subject: 'Refrigeration',
          A: 99,
          B: 100,
          fullMark: 150,
        },
        {
          subject: 'Lighting',
          A: 85,
          B: 90,
          fullMark: 150,
        },
        {
          subject: 'Others',
          A: 65,
          B: 85,
          fullMark: 150,
        },
      ];

    return (
        <div className='radar-container'>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} width={350} height={300} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer> 
        </div>
    )
}