import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Metadata from '../layout/Metadata';
import { Link, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { getOrderDetails, clearErrors, updateOrder } from '../../actions/orderActions';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import './ProcessOrder.css'

const ProcessOrder = () => {

    const { order, error, loading } = useSelector(state => state.orderDetails)
    const { order: updateError, isUpdated } = useSelector(state => state.order)
    // const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("");

    useEffect(() => {
        // console.log("UseEffect started");
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));

    }, [dispatch, alert, error, id, isUpdated, updateError])


    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    }

    return (
        <>
            <Metadata title="Process Order" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? <Loader /> :
                        <div
                            className="confirmOrderPage"
                            style={{
                                display: order && order.orderStatus === "Delivered" ? "block" : "grid",
                            }}
                        >
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography >Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name: </p>
                                            <span>{order && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone: </p>
                                            <span>{order && order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address: </p>
                                            <span>{order && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}.`}</span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={order && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}
                                            >
                                                {order && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount: </p>
                                            <span>{order && order.totalPrice}</span>
                                        </div>
                                    </div>


                                    <Typography>Order Status : </Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={order && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}
                                            >
                                                {order && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items : </Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order &&
                                            order.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <img src={item.image} alt="Product" />
                                                    <Link to={`/product/${item.product}`} >
                                                        {item.name}
                                                    </Link>
                                                    <span>
                                                        {item.quantity} X ₹{item.price} =
                                                        <b>  ₹{item.price * item.quantity}</b>
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: order && order.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form
                                    className="createProductForm"
                                    encType="multipart/form-data"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>

                                    <div>
                                        <AccountTreeIcon />
                                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order && order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}
                                            {order && order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}

                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={loading ? true : false || status === "" ? true : false}
                                    >
                                        Update
                                    </Button>
                                </form>
                            </div>
                        </div>}
                </div>
            </div>
        </>
    )
}

export default ProcessOrder;