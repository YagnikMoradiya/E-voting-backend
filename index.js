import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { db_url } from "./config.js";
import { setup } from "./src/routes/index.js";
import { errors } from "celebrate";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "🏡 Hello Voters 🏡",
    });
});

setup(app);
app.use(errors());

mongoose
    .connect(db_url, {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running on port http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error in connecting db", err);
    });

