const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);

    if (!token) {
        return next(new ErrorHandler("Please login to Access this Resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decodedData);
    req.user = await User.findById(decodedData.id);
    next();
});


// admin or user Authentication
exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {

        // console.log(req.user.role);

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource`,
                403
            ));
        }

        next();
    };
}