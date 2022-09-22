import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/users.js'
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

env.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));

// connect to database
const connect = ()=>{
     mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to db");
    }).catch(err=>{throw err;})
};


app.use(cookieParser());
app.use("/api/auth" , authRoutes);
app.use("/api/users" , userRoutes);
app.use("/api/videos" , videoRoutes);
app.use("/api/comments" , commentRoutes);

app.use((err , req , res , next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong..";
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})


app.listen(8080 , (req , res)=>{
    connect();
    console.log("Connected....");
})