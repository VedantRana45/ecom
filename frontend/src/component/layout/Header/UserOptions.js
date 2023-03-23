import React, { useState } from 'react';
import './Header.css';
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({ user }) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart)

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]

    if (user && user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "DashBoard", func: dashboard },)
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }
    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Succssfully");
    }
    function cart() {
        navigate('/cart');
    }

    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                className='speedDial'
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                style={{ zIndex: "11" }}
                direction="down"
                icon={
                    <img
                        className='speedDialIcon'
                        src={user && user.avatar.url ? user.avatar.url : "/Profile.png"}
                        alt="Profile"
                    />
                }
            >

                {
                    options.map((option) => (
                        <SpeedDialAction
                            key={option.name}
                            icon={option.icon}
                            tooltipTitle={option.name}
                            onClick={option.func}
                            tooltipOpen={window.innerWidth <= 600 ? true : false}
                        />
                    ))
                }
            </SpeedDial>
        </>
    )
}

export default UserOptions;