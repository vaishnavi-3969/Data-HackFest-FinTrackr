import React, { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Visualization = () => {
    const [chartType, setChartType] = useState('pie');

    const pieData = [
        { name: 'Grocery', value: 30 },
        { name: 'Shopping', value: 20 },
        { name: 'Food', value: 15 },
        { name: 'Salary', value: 35 },
    ];

    const barData = [
        { name: 'January', expenses: 1500, income: 2500 },
        { name: 'February', expenses: 1200, income: 2200 },
        { name: 'March', expenses: 1300, income: 2400 },
        { name: 'April', expenses: 1400, income: 2300 },
        { name: 'May', expenses: 1600, income: 2600 },
    ];

    const lineData = [
        { name: 'Week 1', savings: 200 },
        { name: 'Week 2', savings: 350 },
        { name: 'Week 3', savings: 400 },
        { name: 'Week 4', savings: 600 },
    ];

    const renderChart = (chartType) => {
        switch (chartType) {
            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" fill="#8884d8" label />
                        </PieChart>
                    </ResponsiveContainer>
                );

            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="expenses" fill="#36A2EB" />
                            <Bar dataKey="income" fill="#4BC0C0" />
                        </BarChart>
                    </ResponsiveContainer>
                );

            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="savings" stroke="#FF6384" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex">
            <div className="p-3">
                <h2>Pie Chart</h2>
                {renderChart('pie')}
                <button onClick={() => setChartType('pie')}>Render Pie Chart</button>
            </div>

            <div className="p-3">
                <h2>Bar Chart</h2>
                {renderChart('bar')}
                <button onClick={() => setChartType('bar')}>Render Bar Chart</button>
            </div>

            <div className="p-3">
                <h2>Line Chart</h2>
                {renderChart('line')}
                <button onClick={() => setChartType('line')}>Render Line Chart</button>
            </div>
        </div>
    );
};

export default Visualization;
