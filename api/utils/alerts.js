import asyncHandler from "express-async-handler";
import Mailjet from "node-mailjet";
import { pool } from "../utils/connectDb.js";

export const alter = asyncHandler(async (req, res) => {
  const email = req.body.email;
  if (!email) throw new Error("Please send email");

  const expense_query = `select sum(amount) from expenses where email =  ?`;
  const income_query = `select sum(income) from incomes where email =  ?`;
  pool.getConnection(function (err, db) {
    db.query(expense_query, [email], (err, expense_data) => {
      if (err) {
        db.release();
        console.log(err);
        return res.json({ error: "DB connection refusal" });
      }
      if (expense_data.length === 0) {
        db.release();
        return res.json({ error: "DB connection refusal" });
      }
      console.log(expense_data);
      db.query(income_query, [email], (err, income_data) => {
        if (err) {
          db.release();
          console.log(err);
          return res.json({ error: "DB connection refusal" });
        }
        if (income_data.length === 0) {
          db.release();
          return res.json({ error: "DB connection refusal" });
        }
        console.log(income_data);
      });
    });
  });
});