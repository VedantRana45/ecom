import React, { useEffect, useState } from 'react';
import './ResetPassword.css';
import Loader from '../layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { token } = useParams();


    const { error, success, loading } = useSelector(state => state.forgetPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }

        if (success) {
            alert.success("Password Updated Succesfully");
            navigate('/login');
        }
    }, [dispatch, alert, error, success, navigate])




    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <Metadata title="Reset Password" />
                        <div className="resetPasswordContainer">
                            <div className="resetPasswordBox">
                                <h2 className='resetPasswordHeading'>Update Profile</h2>
                                <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>


                                    <div>
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder='New Password'
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <LockIcon />
                                        <input
                                            type="password"
                                            placeholder='Confirm Password'
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>


                                    <input type="submit" value="Update" className="resetPasswordBtn"
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

export default ResetPassword;