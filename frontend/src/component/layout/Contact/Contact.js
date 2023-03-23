import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import Metadata from '../Metadata';

const Contact = () => {
    return (
        <>
            <Metadata title="Contact Us" />
            <div className="contactContainer">
                <a className="mailBtn" href="mailto:ranavedant001@gmail.com">
                    <Button>Contact: ranavedant001@gmail.com</Button>
                </a>
            </div>
        </>
    );
};

export default Contact;
