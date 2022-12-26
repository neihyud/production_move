import './profile.css';
import avatar from '../../assets/landing.jpg';
import React, { useState } from 'react';

const Profile = ({ title }) => {
    const [showProfile, setShowProfile] = useState(false);
    const [editProfile, setEditProfile] = useState(false);

    const toggleShowProfile = () => {
        setShowProfile(!showProfile);
    };

    const toggleEditProfile = () => {
        setEditProfile(!editProfile);
    };

    return (
        <>
            {/* onClick={toggleShowProfile} */}
            <div className="top" title={title} onClick={toggleShowProfile}>
                <img className="avatar" src={avatar} alt="" />
                <div className="name hide">
                    <span>Admin</span>
                    <span className='role'>Admin Manager</span>
                </div>
            </div>

            {showProfile && (
                <div className="model">
                    <div onClick={toggleShowProfile} className="overlay"></div>
                    <div className="content">
                        <div className="avatarWrapper">
                            <img className="avatar2" src={avatar} alt="" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
