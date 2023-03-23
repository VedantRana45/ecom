import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './OrderSuccess.css';
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import Metadata from '../layout/Metadata';

const OrderSuccess = () => {
    return (
        <>
            <Metadata title="Order Completed" />
            <div className="orderSuccess">
                <CheckCircleIcon />
                <Typography>Your Order has Been placed successfully</Typography>
                <Link to="/orders" >View Orders</Link>
            </div>
        </>
    )
}

export default OrderSuccess;