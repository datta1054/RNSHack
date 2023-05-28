import express from "express";
import {
  getAllIncomes,
  addIncome,
  deleteIncome,
  updateIncome,
} from "../controllers/income.js";

const router = express.Router();
router.get("/", getAllIncomes);
router.post("/add", addIncome);
router.delete("/delete/", deleteIncome);
router.patch("/update/", updateIncome);
export default router;
