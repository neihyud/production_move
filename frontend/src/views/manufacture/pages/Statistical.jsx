import '../../../assets/css/common.css';
import SidebarManufacture from '../SidebarManufacture';
import Navbar from '../../../components/navbar/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../contexts/constants';
import faker from 'faker';
import BarChart from '../../../components/charts/barChart/barChart';

const getStatisticalManufacture = async (setData) => {
    const { data = {} } = await axios.get(`${apiUrl}/manufacture/statistical/productLine/manuf`);
    if (data.success) {
        setData(data.data);
    }
};

const getStatisticalAgent = async (setData) => {
    const { data = {} } = await axios.get(`${apiUrl}/manufacture/statistical/productLine/agent`);
    if (data.success) {
        setData(data.data);
    }
};

const getNumberSold = async (setNumberSold) => {
    const { data = {} } = await axios.get(`${apiUrl}/manufacture/statistical/sold`);
    if (data) {
        setNumberSold(data);
    }
};

export default function Statistical() {
    const [dataManufacture, setDataManufacture] = useState([]);
    const [dataAgent, setDataAgent] = useState([]);
    const [numberSold, setNumberSold] = useState([]);

    useEffect(() => {
        getStatisticalManufacture(setDataManufacture);
        getStatisticalAgent(setDataAgent);
        getNumberSold(setNumberSold);
    }, []);

    const dataConfig = (labels, data, dataAll) => {
        console.log('dataAll: ', dataAll);
        return {
            labels,
            datasets: [
                {
                    label: 'All',
                    data: dataAll,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: 'Error',
                    data,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
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

    const labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const dataFaker = {
        labels,
        datasets: [
            {
                label: 'Status',
                data: labels.map(() => Math.floor(Math.random() * 25) + 1),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
            },
        ],
    };

    return (
        <div className="wrapper-body">
            <SidebarManufacture />
            <div className="wrapper-content">
                <Navbar />
                <div className="main-statistical">
                    <BarChart
                        data={dataFaker}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                                title: {
                                    display: true,
                                    text: 'Số lượng sản phẩm bán ra hàng tháng',
                                },
                            },
                        }}
                    />

                    <BarChart
                        data={dataFaker}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                                title: {
                                    display: true,
                                    text: 'Sản phẩm từng loại',
                                },
                            },
                        }}
                    />

                    <BarChart
                        data={dataConfig(
                            dataManufacture.labels,
                            dataManufacture.data,
                            dataManufacture.dataAll,
                        )}
                        options={options('Tỉ lệ lỗi dòng sản phẩm theo Cơ Sở Sản Xuất')}
                    />
                    <BarChart
                        data={dataConfig(dataAgent.labels, dataAgent.data, dataAgent.dataAll)}
                        options={options('Tỉ lệ lỗi dòng sản phẩm theo theo Đại Lý')}
                    />
                </div>
            </div>
        </div>
    );
}
