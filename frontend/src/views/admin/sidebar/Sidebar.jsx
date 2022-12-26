import React from 'react';
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import Profile from '../../../components/profile/Profile';

import { MdDashboard } from 'react-icons/md';
import { FaMotorcycle } from 'react-icons/fa';
import { RiProductHuntLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Sidebar() {
    const title = 'Admin';

    const { logoutUser } = React.useContext(AuthContext);
    return (
        <div className="sidebar">
            <div className="center">
                <ul>
                    <NavLink style={{ textDecoration: 'none' }} to="/">
                        <li title="Statistical">
                            <MdDashboard className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </NavLink>

                    <NavLink style={{ textDecoration: 'none' }} to="/product">
                        <li title="product">
                            <RiProductHuntLine className="icon" />
                            <span>Product</span>
                        </li>
                    </NavLink>

                    <NavLink style={{ textDecoration: 'none' }} to="/productLine">
                        <li title="productLine">
                            <FaMotorcycle className="icon" />
                            <span>ProductLine</span>
                        </li>
                    </NavLink>

                    <NavLink style={{ textDecoration: 'none' }} to="/account">
                        <li title="account">
                            <BsPerson className="icon" />
                            <span>Account</span>
                        </li>
                    </NavLink>
                </ul>
            </div>

            <div className="logout">
                <div>
                    <Profile {...{ title }} />
                </div>

                <div
                    className="logoutWrap"
                    onClick={() => {
                        console.log('test');
                        logoutUser();
                    }}
                >
                    <FiLogOut className="iconlogout" />
                    <span>Log out</span>
                </div>
            </div>
        </div>
    );
}
