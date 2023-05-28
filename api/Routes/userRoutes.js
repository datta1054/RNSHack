import express from "express";
import {
  loginUser,
  registerUser,
  forgotpassword,
  verifyOTPforEmail,
  updatePassword,
  reportPdf
} from "../controllers/auth.js";

const router = express.Router();
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyOTPforEmail);
router.post("/forgot-password", forgotpassword);
router.post("/update-password", updatePassword);

router.post('/report', reportPdf)

// need to put a middle ware
// router.get("/me", protect, getMe);
export default router;
