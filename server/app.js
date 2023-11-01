import express from "express";

export const app = express();

import cors from "cors";
import userRouter from "./routes/userRoute.js";

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//Routes
app.use("/api/v1", userRouter);

//testing api
app.get("/test", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});
