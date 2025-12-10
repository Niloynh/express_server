import express, { NextFunction, Request, Response } from "express";


import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRouter } from "./modules/users/users.router";
import { authRouter } from "./modules/auth/auth.router";




const app = express();


// parser
app.use(express.json());

// 🔥 Direct Neon URL ব্যবহার করো, pooler না

// DB init
initDB();


// Test route
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello, API is working");
});


app.use("/users", userRouter)


// auth route
app.use("auth", authRouter)
// not found 
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    path: req.path
  })
})


export default app;