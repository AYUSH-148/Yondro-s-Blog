import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log("MongoDb connected");
    }).catch((err)=>{
        console.log(err);
    })


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Error-Handling Middleware: This is defined at last. It ensures that it catches any errors that may have occurred in the previous middleware or route handlers.
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});
