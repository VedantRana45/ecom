import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./ProductReviews.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, deleteReviews, getAllReviews } from '../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import Metadata from '../layout/Metadata';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';


const ProductReviews = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, reviews, loading } = useSelector(state => state.productReviews);

    const { error: deleteError, isDeleted } = useSelector(state => state.review);

    const [productId, setProductId] = useState("")

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    }

    const productReviewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    }

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Review Deleted Successsfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }

    }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId])


    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

        {
            field: "user",
            headerName: "User",
            minWidth: 250,
            flex: 0.5,
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 100,
            flex: 0.3,
            cellClassName: (params) => {
                // console.log(params.row.status);
                // console.log(params.row.status);
                return params.row.rating >= 3 ? "greenColor" : "redColor";
            },
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
                        <Button
                            onClick={() =>
                                deleteReviewHandler(params.id)
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

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });


    return (
        <>
            <Metadata title="ALL Reviews --admin" />
            <div className="dashboard">
                <Sidebar />
                <div className="productReviewsContainer">

                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewSubmitHandler}
                    >
                        <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>

                        <div>
                            <StarIcon />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>

                    <h1 id="productListHeading">All Reviews</h1>

                    {reviews && reviews.length > 0 ?
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        /> :
                        <h1 className="productReviewsFormHeading">
                            No Reviews Found
                        </h1>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductReviews;