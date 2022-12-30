// import './page.css';
import '../../../assets/css/common.css';
import SidebarAdmin from '../SidebarAdmin';
import Navbar from '../../../components/navbar/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../contexts/constants';

import BarChart from '../../../components/charts/barChart/barChart';

const getStatisticalAll = async (setData) => {
    const { data = {} } = await axios.get(`${apiUrl}/admin/statistical`);
    if (data.success) {
        setData(data.data);
    }
};

const getStatisticalManufacture = async (setData) => {
    const { data = {} } = await axios.get(`${apiUrl}/admin/statistical/manufacture`);
    if (data.success) {
        setData(data.data);
    }
};

const getStatisticalAgent = async (setData) => {
    const { data = {} } = await axios.get(`${apiUrl}/admin/statistical/agent`);
    if (data.success) {
        setData(data.data);
    }
};

const getStatisticalWarranty = async (setData) => {
    const { data = {} } = await axios.get(`${apiUrl}/admin/statistical/warranty`);
    if (data.success) {
        setData(data.data);
    }
};

export default function Statistical() {
    const [dataAll, setDataAll] = useState([]);
    const [dataManufacture, setDataManufacture] = useState([]);
    const [dataAgent, setDataAgent] = useState([]);
    const [dataWarranty, setDataWarranty] = useState([]);

    useEffect(() => {
        getStatisticalAll(setDataAll);
        getStatisticalManufacture(setDataManufacture);
        getStatisticalAgent(setDataAgent);
        getStatisticalWarranty(setDataWarranty);
    }, []);

    const dataConfig = (labels, data) => {
        return {
            labels,
            datasets: [
                {
                    label: 'Status',
                    data,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                    ],
                },
            ],
        };
    };

    const options = (message) => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: message,
                },
            },
        };
    };

    return (
        <div className="wrapper-body">
            <SidebarAdmin />
            <div className="wrapper-content">
                <Navbar />
                <div className="main-statistical">
                    <BarChart
                        data={dataConfig(['UnSold', 'Sold', 'Fix'], dataAll)}
                        options={options('Theo trạng thái')}
                    />
                    <BarChart
                        data={dataConfig(['New', 'Export', 'Defective'], dataManufacture)}
                        options={options('Theo Cơ Sở Sản Xuất')}
                    />
                    <BarChart
                        data={dataConfig(['UnSold', 'Sold', 'Warranty'], dataAgent)}
                        options={options('Theo Đại lý')}
                    />
                    <BarChart
                        data={dataConfig(['Warranty', 'WarrantyDone', 'Defective'], dataWarranty)}
                        options={options('Theo Trung Tâm Bảo Hành')}
                    />
                </div>
            </div>
        </div>
    );
}
