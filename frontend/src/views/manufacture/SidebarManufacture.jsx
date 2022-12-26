import React from 'react';
import { NavLink } from 'react-router-dom';

import { MdDashboard } from 'react-icons/md';
import { FaMotorcycle } from 'react-icons/fa';
import { RiProductHuntLine } from 'react-icons/ri';
import { BsPerson } from 'react-icons/bs';

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

            <NavLink style={{ textDecoration: 'none' }} to="/account">
                <li title="account">
                    <BsPerson className="icon" />
                    <span>Account</span>
                </li>
            </NavLink>
        </Sidebar>
    );
}
