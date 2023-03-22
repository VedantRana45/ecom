const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database');


//handling Uncaught Exception like "console.log(youtube);"
process.on("uncaughtException", err => {
    console.log(`Error : ${err.message}`);
    console.log('shutting down the servr due to Uncaught Exception');
    process.exit(1);
});
// console.log(youtube);


//Configuration of dotenv 
dotenv.config({ path: "backend/config/.env" });

// connection to database 
connectDatabase();



//connection configuration of cloud connectivity
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})


//unhandled Promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log('shutting down the servr due to unhandled rejection');

    // server.close(() => {
    //     process.exit(1);
    // });
});