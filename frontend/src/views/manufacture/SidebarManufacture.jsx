import React from 'react';
import { NavLink } from 'react-router-dom';

import { MdDashboard, MdReportGmailerrorred } from 'react-icons/md';
import { RiProductHuntLine } from 'react-icons/ri';

import Sidebar from '../../components/sidebar/Sidebar';

export default function SidebarManufacture() {
    return (
        <Sidebar>
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

            <NavLink style={{ textDecoration: 'none' }} to="/defective">
                <li title="repair">
                    <MdReportGmailerrorred className="icon" />
                    <span>Defective</span>
                </li>
            </NavLink>
        </Sidebar>
    );
}
