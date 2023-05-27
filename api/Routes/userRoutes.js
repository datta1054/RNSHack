import express from "express";
import { loginUser, registerUser } from "../auth.js";

const router = express.Router();
router.post("/", registerUser);
router.post("/login", loginUser);
// need to put a middle ware
// router.get("/me", protect, getMe);
export default router;
