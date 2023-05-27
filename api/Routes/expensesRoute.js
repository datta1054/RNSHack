import express from "express";
import { getAllExpenses, addExpense } from "../controllers/expenses.js";

const router = express.Router();
router.post("/", getAllExpenses);
router.post("/add", addExpense);
// need to put a middle ware
// router.get("/me", protect, getMe);
export default router;
