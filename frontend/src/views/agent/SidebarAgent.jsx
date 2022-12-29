import React from 'react';
import { NavLink } from 'react-router-dom';

import { MdDashboard, MdReportGmailerrorred } from 'react-icons/md';
import { RiProductHuntLine } from 'react-icons/ri';
import { AiOutlineAlert, AiFillDownCircle } from 'react-icons/ai';
import { GiBugleCall } from 'react-icons/gi';
import { FaBuysellads } from 'react-icons/fa';

import Sidebar from '../../components/sidebar/Sidebar';

export default function SidebarAgent() {
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

            <NavLink style={{ textDecoration: 'none' }} to="/sold">
                <li title="product">
                    <FaBuysellads className="icon" />
                    <span>Sold</span>
                </li>
            </NavLink>

            <NavLink style={{ textDecoration: 'none' }} to="/warranty">
                <li title="product">
                    <AiOutlineAlert className="icon" />
                    <span>Warranty</span>
                </li>
            </NavLink>

            <NavLink style={{ textDecoration: 'none' }} to="/warranty-done">
                <li title="product">
                    <AiFillDownCircle className="icon" />
                    <span>Warranty Done</span>
                </li>
            </NavLink>

            <NavLink style={{ textDecoration: 'none' }} to="/recall">
                <li title="product">
                    <GiBugleCall className="icon" />
                    <span>Recall</span>
                </li>
            </NavLink>
        </Sidebar>
    );
}
