import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails'
import Products from './component/Product/Products'
import Search from './component/Product/Search'
import './App.css';
import LoginSignUp from './component/User/LoginSignUp';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions'
import { useDispatch, useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgetPassword from './component/User/ForgetPassword';
import ResetPassword from './component/User/ResetPassword.js';
import Protected from './component/Route/Protected';
import Cart from "./component/Cart/Cart"
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import OrderSuccess from './component/Cart/OrderSuccess.js';
import Payment from './component/Cart/Payment.js';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DashBoard from './component/Admin/DashBoard.js'
import ProductList from './component/Admin/ProductList.js'
import NewProduct from './component/Admin/NewProduct.js'
import UpdateProduct from './component/Admin/UpdateProduct.js'
import OrderList from './component/Admin/OrderList.js'
import ProcessOrder from './component/Admin/ProcessOrder.js'
import UserList from './component/Admin/UserList.js'
import UpdateUser from './component/Admin/UpdateUser.js'
import ProductReviews from './component/Admin/ProductReviews.js'
import About from './component/layout/About/About';
import Contact from './component/layout/Contact/Contact';
import NotFound from './component/layout/NotFound/NotFound';


function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    getStripeApiKey();
    // console.log(stripeApiKey);
    dispatch(loadUser());

  }, [stripeApiKey, dispatch]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {user && isAuthenticated && <UserOptions user={user} />}


      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes >
            {/* //this route require Elements component */}
            <Route exact path='/process/payment' element={<Protected component={Payment} />} />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/products/:keyword' element={<Products />} />
        <Route exact path='/login' element={<LoginSignUp />} />
        <Route exact path='/account' element={<Protected component={Profile} />} />
        <Route exact path='/me/update' element={<Protected component={UpdateProfile} />} />
        <Route exact path='/password/update' element={<Protected component={UpdatePassword} />} />
        <Route exact path='/password/forget' element={<ForgetPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/shipping' element={<Protected component={Shipping} />} />
        <Route exact path='/order/confirm' element={<Protected component={ConfirmOrder} />} />


        <Route exact path='/success' element={<Protected component={OrderSuccess} />} />
        <Route exact path='/orders' element={<Protected component={MyOrders} />} />
        <Route exact path='/order/:id' element={<Protected component={OrderDetails} />} />

        {/* //Admin Routes */}
        <Route exact path='/admin/dashboard' element={<Protected isAdmin={true} component={DashBoard} />} />
        <Route exact path='/admin/products' element={<Protected isAdmin={true} component={ProductList} />} />
        <Route exact path='/admin/product' element={<Protected isAdmin={true} component={NewProduct} />} />
        <Route exact path='/admin/product/:id' element={<Protected isAdmin={true} component={UpdateProduct} />} />
        <Route exact path='/admin/orders' element={<Protected isAdmin={true} component={OrderList} />} />
        <Route exact path='/admin/order/:id' element={<Protected isAdmin={true} component={ProcessOrder} />} />
        <Route exact path='/admin/users' element={<Protected isAdmin={true} component={UserList} />} />
        <Route exact path='/admin/user/:id' element={<Protected isAdmin={true} component={UpdateUser} />} />
        <Route exact path='/admin/reviews' element={<Protected isAdmin={true} component={ProductReviews} />} />
        {/* <Route element={window.location.pathname === "/process/payment" ? null : <NotFound />} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>


      <Footer />
    </Router>
  );
}

export default App;
