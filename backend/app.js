const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require('path');

const errorMiddleWare = require("./middleware/error");

//Configuration of dotenv 
dotenv.config({ path: "backend/config/.env" });


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "../frontend/public")));
app.get("*", function(req, res){
res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
})

//Route imports
const product = require("./routes/productRoute");
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require("./routes/paymentRoutes");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);



//Middleware for Error
app.use(errorMiddleWare);
module.exports = app;