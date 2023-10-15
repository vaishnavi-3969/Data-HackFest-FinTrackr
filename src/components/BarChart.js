import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Expenses',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: [12, 19, 3, 5, 2, 3],
            },
            {
                label: 'Income',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: [10, 15, 4, 8, 5, 6],
            },
        ],
    };

    const chartStyle = {
        maxWidth: '600px',
        margin: '0 400px',
    };

    return (
        <div className='p-3'>
            <h2>Bar Chart</h2>
            <div style={chartStyle}>
                <Bar data={data} />
            </div>
        </div>
    );
};

export default BarChart;