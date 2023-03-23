import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Metadata from '../layout/Metadata';
import './Search.css';

const Search = () => {
    const navigate = useNavigate();
    // console.log(history);
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <>
            <Metadata title="Search Products --Ecommerce" />

            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text" placeholder='Search A Product...' onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" value="Search" />
            </form>
        </>
    )
}

export default Search;