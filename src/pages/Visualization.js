import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

const Visualization = () => {
    const pieChartData = {
        labels: ['Grocery', 'Shopping', 'Food', 'Salary'],
        datasets: [
            {
                data: [30, 20, 15, 35],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Expenses',
                data: [1500, 1200, 1300, 1400, 1600],
                backgroundColor: '#36A2EB',
            },
            {
                label: 'Income',
                data: [2500, 2200, 2400, 2300, 2600],
                backgroundColor: '#4BC0C0',
            },
        ],
    };

    const lineChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Savings',
                data: [200, 350, 400, 600],
                borderColor: '#FF6384',
                fill: false,
            },
        ],
    };

    return (
        <div>

            <Line
                datasetIdKey='id'
                data={{
                    labels: ['Jun', 'Jul', 'Aug'],
                    datasets: [
                        {
                            id: 1,
                            label: '',
                            data: [5, 6, 7],
                        },
                        {
                            id: 2,
                            label: '',
                            data: [3, 2, 1],
                        },
                    ],
                }}
            />
        </div>
        // <div className="flex">
        //   <div className="p-3">
        //     <h2>Pie Chart</h2>
        //     <Pie data={pieChartData} />
        //   </div>

        //   <div className="p-3">
        //     <h2>Bar Chart</h2>
        //     <Bar data={barChartData} />
        //   </div>

        //   <div className="p-3">
        //     <h2>Line Chart</h2>
        //     <Line data={lineChartData} />
        //   </div>
        // </div>
    );
};

export default Visualization;