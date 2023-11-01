import express from "express";
import {
  registerationUser,
  getAllUsers,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/users-list", getAllUsers);
userRouter.post("/registration", registerationUser);
export default userRouter;
