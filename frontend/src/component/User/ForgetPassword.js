import React, { useEffect, useState } from 'react';
import './ForgetPassword.css';
import Loader from '../layout/Loader/Loader';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';


const ForgetPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, message, loading } = useSelector(state => state.forgetPassword);

    const [email, setEmail] = useState("");

    const forgetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);

        dispatch(forgetPassword(myForm));
    }


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }

        if (message) {
            alert.success(message);
        }
    }, [dispatch, alert, error, message])



    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <Metadata title="Forget Password" />
                        <div className="forgetPasswordContainer">
                            <div className="forgetPasswordBox">
                                <h2 className='forgetPasswordHeading'>Forget Password</h2>
                                <form className="forgetPasswordForm" onSubmit={forgetPasswordSubmit}>

                                    <div className="forgetPasswordEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <input type="submit" value="Send Email" className="forgetPasswordBtn"
                                    // disabled={loading ? true : false}
                                    />
                                </form>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default ForgetPassword