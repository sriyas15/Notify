import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });
import express from 'express';
import notesRoutes from './src/routes/notesRoutes.js';
import { connectDB } from './src/config/db.js';
import rateLimiter from "./src/middleware/rateLimiter.js";
import cors from 'cors';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes",notesRoutes);

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is Started at ${process.env.PORT}`);
});
