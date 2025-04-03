import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/database";
// import userRoute from "./Routes/UserRoutes";

const app: Express = express();

//Db connection
connectDB();

// CORS configuration
const corsOptions = {
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorisation"],
    credentials: true, // Allow (cookies, authentication)
};

//cors middleware
app.use(cors(corsOptions));

//middleware to parser cookies
app.use(cookieParser());

//parsing datas
app.use(express.urlencoded());
app.use(express.json());

//user router
// app.use("/users", userRoute);

//port configuration
const PORT: number | string = process.env.PORT || 5000;

app.listen(PORT, (error?: Error) => {
    if (!error) {
        console.log("server listening at 5000");
    } else {
        console.log("Error occcured at server", error.message);
    }
});
