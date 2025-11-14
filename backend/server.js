import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });
import express from 'express';
import notesRoutes from './src/routes/notesRoutes.js';
import { connectDB } from './src/config/db.js';
import rateLimiter from "./src/middleware/rateLimiter.js";
import cors from 'cors';
import path from 'path';

const app = express();

connectDB();

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


if( process.env.NODE_ENV !== "production"){
    app.use(cors());
}

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes",notesRoutes);

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is Started at ${process.env.PORT}`);
});
