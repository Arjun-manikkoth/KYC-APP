"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = require("./database/database");
const route_1 = __importDefault(require("./routes/route"));
const app = (0, express_1.default)();
//Db connection
(0, database_1.connectDB)();
// CORS configuration
const corsOptions = {
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorisation"],
    credentials: true, // Allow (cookies, authentication)
};
//cors middleware
app.use((0, cors_1.default)(corsOptions));
//middleware to parser cookies
app.use((0, cookie_parser_1.default)());
//parsing datas
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
//router
app.use("/", route_1.default);
//port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
    if (!error) {
        console.log("server listening at 5000");
    }
    else {
        console.log("Error occcured at server", error.message);
    }
});
