require("dotenv").config()


import express from 'express';
import config from "config";
import router from "./router";
import db from "../config/db";
import Logger from '../config/logger';
import morganMiddleware from './middleware/morgan-middleware';

const port = config.get<number>("port");
const app = express();

// JSON middleware
app.use(express.json())

// Middleware
app.use(morganMiddleware)

// Routes

app.use("/api", router)




app.listen(port, async () => {

    await db();

    Logger.info(`Application running on port ${port}`);
});