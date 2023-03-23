import React, { useEffect } from 'react';
import './OrderDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { getOrderDetails, clearErrors } from '../../actions/orderActions';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';


const OrderDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { user } = useSelector(state => state.user);
    const { id } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id));
    }, [alert, error, id]);
    // console.log(user.name);
    // console.log(order);

    // if (order) {
    //     var { taxPrice } = order;
    // }
    // console.log(taxPrice);

    // const { taxPrice } = order;
    // console.log(taxPrice);



    return (
        <>
            <Metadata title="Order Details" />
            {loading ? (<Loader />) : (
                <>{
                    order &&
                    <h1>{order.user._id}</h1>
                }
                </>
            )}
        </>
    )
}

export default OrderDetails;