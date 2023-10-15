import React, { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Cards from './Cards';

const Visualization = () => {
    const [chartType, setChartType] = useState('pie');

    const pieData = [
        { name: 'Grocery', value: 300 },
        { name: 'Shopping', value: 200 },
        { name: 'Food', value: 150 },
        { name: 'Salary', value: 350 },
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

    const areaData = [
        { name: 'January', expenses: 1500, income: 2500 },
        { name: 'February', expenses: 1200, income: 2200 },
        { name: 'March', expenses: 1300, income: 2400 },
        { name: 'April', expenses: 1400, income: 2300 },
        { name: 'May', expenses: 1600, income: 2600 },
    ];
    const savingsOverTime = [
        { month: 'Jan', savings: 1000 },
        { month: 'Feb', savings: 1200 },
        { month: 'Mar', savings: 1500 },
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

            case 'area':
                return (

                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={areaData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area dataKey="expenses" stackId="1" fill="#36A2EB" />
                            <Area dataKey="income" stackId="1" fill="#4BC0C0" />
                        </AreaChart>
                    </ResponsiveContainer>
                );
            case 'savingsOverTime':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={savingsOverTime}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="savings" stroke="#008000" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            default:
                return null;
        }
    };

    return (
        <div className='p-4'>
            <h1 className="text-3xl font-semibold">Personal Finance Tracker</h1>

            <div className="flex">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <Cards title="Income" amount="2500" description="Your total income this month" />
                    <Cards title="Expenses" amount="1200" description="Your total expenses this month" />
                    <Cards title="Savings" amount="1300" description="Your total savings this month" />
                </div>
            </div>

            <div>
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

                <div className="p-3">
                    <h2>Area Chart</h2>
                    {renderChart('area')}
                    <button onClick={() => setChartType('area')}>Render Area Chart</button>
                </div>
            </div>
        </div>
    );
};

export default Visualization;
