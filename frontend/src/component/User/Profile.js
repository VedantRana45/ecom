import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Metadata from '../layout/Metadata';
import Loader from '../layout/Loader/Loader';
import { useSelector } from 'react-redux';
import './Profile.css';

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector(state => state.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    })

    return (

        <>
            {loading ? <Loader /> : (
                <>
                    <Metadata title={`${user && user.name}'s Profile `} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={user && user.avatar.url} alt={user && user.name} />
                            <Link to="/me/update" >Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user && user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user && user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user && user.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/orders">My orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile;