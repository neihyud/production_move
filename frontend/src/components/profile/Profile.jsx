import './profile.css';
import avatar from '../../assets/landing.jpg';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [editProfile, setEditProfile] = useState(false);

    const toggleShowProfile = () => {
        setShowProfile(!showProfile);
    };

    const toggleEditProfile = () => {
        setEditProfile(!editProfile);
    };

    const {
        authState: { user },
    } = useContext(AuthContext);

    let { role } = user ? user : { role: '' };

    let title = user.username;
    role = role + ' Manager';
    return (
        <>
            {/* onClick={toggleShowProfile} */}
            <div className="top" title={title} onClick={toggleShowProfile}>
                <img className="avatar" src={avatar} alt="" />
                <div className="name hide">
                    <span>{title}</span>
                    <span className="role">{role}</span>
                </div>
            </div>

            {showProfile && (
                <div className="model">
                    <div onClick={toggleShowProfile} className="overlay"></div>
                    <div className="content">
                        <div className="avatar-wrapper">
                            <img className="avatar2" src={avatar} alt="" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
