const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //Wrong Mongodb ID error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }


    //Mongoose duplicate key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong JSON web token error
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is Invalid, try Again`;
        err = new ErrorHandler(message, 400);
    }

    //JSON web token Expired error
    if (err.name === "TokenExpiredError") {
        const message = `Json web token is Expired, try Again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: true,
        message: err.message
    });
};