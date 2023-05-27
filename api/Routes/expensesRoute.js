import express from "express";
import {
  getAllExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../controllers/expenses.js";

const router = express.Router();
router.get("/", getAllExpenses);
router.post("/add", addExpense);
router.delete("/delete/", deleteExpense);
router.patch("/update/", updateExpense);
export default router;
