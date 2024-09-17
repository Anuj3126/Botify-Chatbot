import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import appRouter from "./routes/index.js";
config();
const app=express();

//Middlewares
app.use(cors({origin:"http://localhost:5173",credentials:true})); //To allow the cross sharing of information
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
//Remove it during production
app.use(morgan("dev")); //For logging HTTP Requests

app.use("/api/v1", appRouter) //API structure for an application
// '/api/v1' is to define a path and any name can be used.
export default app;
