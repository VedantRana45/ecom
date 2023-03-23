import React from 'react';
import './CheckoutSteps.css';
import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        },
    ]

    const stepStyles = {
        boxSizing: "border-box",
        margin: "3vmax 0 1.5vmax 0",
    }

    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} >
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            icon={item.icon}
                            style={{ color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.645)", }}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default CheckoutSteps;