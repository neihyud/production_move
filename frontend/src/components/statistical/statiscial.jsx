import './statistical.css';
import Sidebar from '../sidebar/sidebar';
import Navbar from '../../../../components/navbar/navbar';
import PiaChart from '../../../../components/charts/pieChart/pieChart';
import BarChart from '../../../../components/charts/barChart/barChart';

export default function Statistical() {
    return (
        <div className="statistical">
            <Sidebar />
            <div className="wrapper-content">
                <Navbar />
                <div className="main-statistical">
                    <PiaChart />
                    <BarChart />
                    <BarChart />
                    <BarChart />
                </div>
            </div>
        </div>
    );
}
