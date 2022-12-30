// import './page.css';
import '../../../assets/css/common.css';
import SidebarAgent from '../SidebarAgent';
import Navbar from '../../../components/navbar/Navbar';
import BarChart from '../../../components/charts/barChart/barChart';

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
    const dataConfig = {
        labels,
        datasets: [
            {
                label: 'Status',
                data: labels.map(() => Math.floor(Math.random() * 50) + 1),
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
            <SidebarAgent />
            <div className="wrapper-content">
                <Navbar />
                <div className="main-statistical">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <BarChart
                            data={dataConfig}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Số lượng sản phẩm bán ra',
                                    },
                                },
                            }}
                        />
                        <select>
                            <option value="month">Month</option>
                            <option value="quarter">Quarter</option>
                            <option value="year">Year</option>
                        </select>
                    </div>

                    <BarChart
                        data={dataConfig}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                                title: {
                                    display: true,
                                    text: 'Số liệu sản phẩm theo từng loại',
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
