import express, { Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app= express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true
    }
))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import authRoutes from './routes/auth.routes';
import healthRoutes from './routes/health.routes';
import bookRoutes from './routes/books.routes';
import courseRoutes from './routes/courses.routes'
import { errorHandler } from './middleware/error.middleware';


app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/courses", courseRoutes);

app.get('/', (_, res: Response)=>{
    
    res.status(200).json({
        message: "backend working",
        statusCode: 200
    });

})


//------------------------Error middleware------

app.use(errorHandler);
export {app};