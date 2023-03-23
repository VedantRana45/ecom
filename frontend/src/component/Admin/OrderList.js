import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import Metadata from '../layout/Metadata';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import { getAllOrders, deleteOrder, clearErrors } from '../../actions/orderActions';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';


const OrderList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, orders } = useSelector(state => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector(state => state.order);


    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Order Deleted Successsfully");
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());

    }, [dispatch, alert, error, deleteError, isDeleted, navigate])


    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
            flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                // console.log(params.row.status);
                // console.log(params.row.status);
                return params.row.status === "Delivered" ? "greenColor" : "redColor";
            },
        },
        {
            field: "itemQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/order/${params.id}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteOrderHandler(params.id)
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemQty: item && item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
            // console.log(item.orderItems.length);
        });

    // console.log(orders[0].orderItems.length);

    return (
        <>
            <Metadata title="ALL  Orders --admin" />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL Orders</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}


export default OrderList;