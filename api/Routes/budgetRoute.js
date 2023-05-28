import express from "express";
import {
  getAllBudgetsOfAUser,
  getABudgetOfUser,
  addAnItemToABudget,
  updateAnItemToABudget,
  deleteAnItemToABudget,
} from "../controllers/budgets.js";

const router = express.Router();
router.get("/all", getAllBudgetsOfAUser);
router.get("/get_budget", getABudgetOfUser);
router.post("/add", addAnItemToABudget);
router.delete("/delete/", deleteAnItemToABudget);
router.patch("/update/", updateAnItemToABudget);
export default router;
