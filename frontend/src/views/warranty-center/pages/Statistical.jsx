// import './page.css';
import React from 'react';
import '../../../assets/css/common.css';
import SidebarWarranty from '../SidebarWarranty';
import Navbar from '../../../components/navbar/Navbar';
import BarChart from '../../../components/charts/barChart/barChart';
import faker from 'faker';
export default function Statistical() {
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

    const dataConfig = {
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

    const [dataTest, setDataTest] = React.useState(dataConfig);
    const [dataTest1, setDataTest1] = React.useState(dataConfig);
    const [dataTest2, setDataTest2] = React.useState(dataConfig);

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
    const agrs1 = { setDataTest: setDataTest2, dataTest: dataTest2 };

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
        handleChange({
            event,
            dataTest,
            setDataTest,
            labels,
            labels1,
            labels2,
            commonDataSets,
            ...agrs1,
        });
    };

    return (
        <div className="wrapper-body">
            <SidebarWarranty />
            <div className="wrapper-content">
                <Navbar />
                <div className="main-statistical">
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
                                    text: 'Fixing',
                                },
                            },
                        }}
                    />
                    <BarChart
                        data={dataTest1}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                                title: {
                                    display: true,
                                    text: 'Warranty Done',
                                },
                            },
                        }}
                    />
                    <BarChart
                        data={dataTest2}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                                title: {
                                    display: true,
                                    text: 'Defective',
                                },
                            },
                        }}
                    />
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
