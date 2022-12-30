// import './page.css';
import '../../../assets/css/common.css';
import SidebarWarranty from '../SidebarWarranty';
import Navbar from '../../../components/navbar/Navbar';
import BarChart from '../../../components/charts/barChart/barChart';

export default function Statistical() {
    const labels = ['UnSold', 'Sold', 'Fix'];
    const data = [10, 20, 30];
    const dataConfig = {
        labels,
        datasets: [
            {
                label: 'Status',
                data,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
            },
        ],
    };

    return (
        <div className="wrapper-body">
            <SidebarWarranty />
            <div className="wrapper-content">
                <Navbar />
                <div className="main-statistical">
                    <BarChart
                        data={dataConfig}
                        options={{
                            title: {
                                display: 'Hifsadfasdfsdfa',
                                text: 'Largest Cities In',
                                fontSize: 25,
                            },
                            legend: {
                                display: 'a',
                                position: 'b',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
