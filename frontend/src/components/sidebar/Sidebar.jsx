import React from 'react';
import './sidebar.css';

import Profile from '../../components/profile/Profile';

import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '../../contexts/AuthContext';

export default function Sidebar({ children }) {
    const { logoutUser } = React.useContext(AuthContext);

    return (
        <div className="sidebar">
            <div>
                <ul>{children}</ul>
            </div>

            <div className="logout">
               <div> <Profile /></div>

                <div
                    className="logout-wrap"
                    onClick={() => {
                        logoutUser();
                    }}
                >
                    <FiLogOut className="icon-logout" />
                    <span>Log out</span>
                </div>
            </div>
        </div>
    );
}
