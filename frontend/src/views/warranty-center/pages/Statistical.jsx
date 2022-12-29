import './page.css';
import '../../../assets/css/common.css';
import SidebarWarranty from '../SidebarWarranty';
import Navbar from '../../../components/navbar/Navbar';
import PiaChart from '../../../components/charts/pieChart/pieChart';
import BarChart from '../../../components/charts/barChart/barChart';

export default function Statistical() {
    return (
        <div className="wrapper-body">
            <SidebarWarranty />
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
