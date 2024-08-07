import { mongoose } from "@typegoose/typegoose";
import app from "./app.js";
import { config } from "dotenv";
config();
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
if (!uriDb) {
    throw new Error("Please set the environment variable: DB_HOST");
}
const connection = mongoose.connect(uriDb);
connection
    .then(() => {
    app.listen(PORT, function () {
        console.log(`Server running. Use our API on port: ${PORT}`);
    });
})
    .catch((err) => console.log(`Server not running. Error message: ${err.message}`));
