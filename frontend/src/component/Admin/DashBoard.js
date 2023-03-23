import React, { useEffect } from 'react';
import Sidebar from './Sidebar.js';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
// import { Typography } from '@material-ui/core';
import {
    Doughnut,
    Line
} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProduct } from '../../actions/productAction.js';
import { getAllOrders } from '../../actions/orderActions.js';
import { getAllUsers } from '../../actions/userAction.js';

const DashBoard = () => {


    const dispatch = useDispatch();
    const { error, products } = useSelector(state => state.products);
    const { orders } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUsers);

    let outOfStock = 0;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch, error]);

    products && products.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72,49)"],
                data: [0, totalAmount],
            }
        ]
    }

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00a684", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products && products.length - outOfStock],
            }
        ]
    }

    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className="dashboardContainer">
                    <Typography component="h1">DashBoard</Typography>

                    <div className="dashboardSummary">
                        <div>
                            <p>
                                Total Amount <br /> ₹{totalAmount}
                            </p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>{orders && orders.length}</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>
                    </div>


                    <div className="lineChart">
                        <Line data={lineState} />
                    </div>

                    <div className="doughnutChart">
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard;