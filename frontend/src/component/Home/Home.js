import React, { useEffect } from 'react';
import { BsMouse } from 'react-icons/bs';
import './Home.css';
import ProductCard from './ProductCard';
import Metadata from '../layout/Metadata';
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert';

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);


    return (
        <>
            {loading ?
                <Loader />
                :
                <>
                    <Metadata title="Ecommerce" />
                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW </h1>

                        <a href="#container">
                            <button>
                                Scroll <BsMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>
                    <div className="container" id="container">
                        {products && products.map((product) => (
                            <ProductCard product={product} key={product._id} />
                        ))}
                    </div>
                </>
            }
        </>
    )
}

export default Home;

//https://i.ibb.co//DRST11n/1.webp