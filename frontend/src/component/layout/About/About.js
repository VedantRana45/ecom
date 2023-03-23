import React from "react";
import "./AboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Metadata from '../Metadata';

const About = () => {
    const visitLinkedIn = () => {
        window.location = "https://www.linkedin.com/in/vedant-rana-4b2795215";
    };
    return (
        <>
            <Metadata title="About Us" />
            <div className="aboutSection">
                <div></div>
                <div className="aboutSectionGradient"></div>
                <div className="aboutSectionContainer">
                    <Typography component="h1">About Us</Typography>

                    <div>
                        <div>
                            <Avatar
                                style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                                src="https://res.cloudinary.com/dyvw4nkan/image/upload/v1679490903/IMG20220515192714_pkzkb6.jpg"
                                alt="Founder"
                            />
                            <Typography>Vedant Rana</Typography>
                            <Button onClick={visitLinkedIn} color="primary">
                                Visit LinkedIn Profile
                            </Button>
                            <span>
                                This is My First Full MERN Stack Project Which is Created with help of Youtube.
                            </span>
                        </div>
                        <div className="aboutSectionContainer2">
                            <Typography component="h2">Contact Me</Typography>
                            <a href="https://www.linkedin.com/in/vedant-rana-4b2795215" target="blank">
                                <LinkedInIcon className="linkedInSvgIcon" />
                            </a>

                            <a href="https://github.com/VedantRana45" target="blank">
                                <GitHubIcon className="GitSvgIcon" />
                            </a>

                            <a href="https://www.instagram.com/vedant._rana._" target="blank">
                                <InstagramIcon className="instagramSvgIcon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
