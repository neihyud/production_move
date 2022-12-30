import '../../../assets/css/common.css';
import SidebarManufacture from '../SidebarManufacture';
import Navbar from '../../../components/navbar/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../contexts/constants';
import faker from 'faker';
import BarChart from '../../../components/charts/barChart/barChart';
import React from 'react';

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
    const labels1 = ['Q1', 'Q2', 'Q3', 'Q4'];
    const labels2 = ['Y2020', 'Y2021', 'Y2022'];

    const dataConfig1 = {
        labels,
        datasets: [
            {
                label: 'Số lượng',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: ['rgba(54, 162, 235, 0.6)'],
            },
        ],
    };

    const commonDataSets = {
        label: 'Số lượng',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: ['rgba(54, 162, 235, 0.6)'],
    };

    const [dataTest, setDataTest] = React.useState(dataConfig1);
    const [dataTest1, setDataTest1] = React.useState(dataConfig1);

    const handleChange = ({
        event,
        dataTest,
        setDataTest: setData,
        labels,
        labels1,
        labels2,
        commonDataSets,
    }) => {
        if (event.target.value === 'month') {
            setData({
                ...dataTest,
                labels: labels,
                datasets: [
                    {
                        ...commonDataSets,
                        data: labels.map(() => faker.datatype.number({ min: 10, max: 50 })),
                    },
                ],
            });
        } else if (event.target.value === 'quarter') {
            setData({
                ...dataTest,
                labels: labels1,
                datasets: [
                    {
                        ...commonDataSets,
                        data: labels1.map(() => faker.datatype.number({ min: 5, max: 50 })),
                    },
                ],
            });
        } else {
            setData({
                ...dataTest,
                labels: labels2,
                datasets: [
                    {
                        ...commonDataSets,
                        data: labels2.map(() => faker.datatype.number({ min: 2, max: 50 })),
                    },
                ],
            });
        }
    };

    const agrs = { setDataTest: setDataTest1, dataTest: dataTest1 };

    const handleChangeLabels = (event) => {
        handleChange({ event, dataTest, setDataTest, labels, labels1, labels2, commonDataSets });
        handleChange({
            event,
            dataTest,
            setDataTest,
            labels,
            labels1,
            labels2,
            commonDataSets,
            ...agrs,
        });
    };

    return (
        <div className="wrapper-body">
            <SidebarManufacture />
            <div className="wrapper-content">
                <Navbar />
                <div className="main-statistical">
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

                    <div>
                        <BarChart
                            data={dataTest}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Số lượng sản phẩm bán ra',
                                    },
                                },
                            }}
                        />
                    </div>
                    <div>
                        <select onChange={handleChangeLabels}>
                            <option value="month">Month</option>
                            <option value="quarter">Quarter</option>
                            <option value="year">Year</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
