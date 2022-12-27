import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

mongoose.set('strictQuery', true)

async function connect() {
    const dbUri = config.get<string>("dbUri");

    try {

        await mongoose.connect(dbUri);
        Logger.info("Connected to the database");
        
    } catch (e) {
        Logger.error("Unable to connect to the database!");
        Logger.error(e);
        process.exit(1);
    }
}

export default connect;

