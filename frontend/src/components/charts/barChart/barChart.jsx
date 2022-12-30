import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const barChart = ({ data, options }) => {
    return (
        <div className="chart">
            <Bar data={data} options={options} className="chartMain" />
        </div>
    );
};

export default barChart;
