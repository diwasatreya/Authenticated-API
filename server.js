import app from "./src/app.js";
import dotenv from 'dotenv';
import { connectDB } from "./src/config/db.js";

dotenv.config();

function startServer() {
    try {
        const PORT = process.env.PORT;
        if (!PORT) throw new Error("No PORT provided!");

        const URL = process.env.URL;
        if (!URL) throw new Error("No MongoDB URL provided!");

        connectDB(URL);

        app.listen(PORT, () => {
            console.log(`🔥 Server started & listening on http://localhost:${PORT}`);
        })

    } catch (error) {
        console.error(error);
        return;
    }
};

startServer();