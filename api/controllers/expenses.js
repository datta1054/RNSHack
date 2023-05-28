//dependencies
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

//imports
import { pool } from "../utils/connectDb.js";
//POST /api/users/expenses/add
export const addExpense = asyncHandler(async (req, res) => {
  const user_email = req.body.email;
  if (!user_email) {
    throw new Error("Please Enter All The Details");
  }
  let q = `select * from users where email = ?`;
  pool.getConnection(function (err, db) {
    db.query(q, [user_email], (err, data) => {
      if (err) {
        db.release();
        console.log(err);
        return res.json({ error: "DB connection refusal" });
      }
      if (data.length === 0) {
        db.release();
        return res
          .status(404)
          .json("Email hasn't register Please register first");
      }
      let date = req.body.date;
      if (!date) {
        date = new Date().toISOString().slice(0, 10);
      }
      q =
        "insert into expenses(ExpenseNumberID,amount,category,curr_date,user_email) values (?)";
      const values = [
        uuidv4(),
        req.body.amount,
        req.body.category,
        date,
        user_email,
      ];
      db.query(q, [values], (err, data) => {
        if (err) {
          db.release();
          return res.json({ err });
        }
        db.release();
        res.status(200).json({ success: "added expense" });
      });
    });
  });
});

//GET /api/users/expenses

export const getAllExpenses = asyncHandler(async (req, res) => {
  const user_email = req.body.email;
  if (!user_email) {
    throw new Error("Please Enter All The Details");
  }
  let q = `select * from users where email = ?`;
  pool.getConnection(function (err, db) {
    db.query(q, [user_email], (err, data) => {
      if (err) {
        db.release();
        console.log(err);
        return res.json({ error: "DB connection refusal" });
      }
      if (data.length === 0) {
        db.release();
        return res
          .status(404)
          .json("Email hasn't register Please register first");
      }

      q = "select * from expenses where user_email = ?";

      db.query(q, [user_email], (err, data) => {
        if (err) {
          db.release();
          return res.json({ err });
        }
        db.release();
        res.status(200).json({ data: data });
      });
    });
  });
});

// DELETE /api/users/expenses/delete
export const deleteExpense = asyncHandler(async (req, res) => {
  const ExpenseNumberID = req.body.ExpenseNumberID;
  if (!ExpenseNumberID) {
    throw new Error("Please enter which particular expense need to be deleted");
  }
  let q = `DELETE FROM expenses WHERE ExpenseNumberID = ?;
`;
  pool.getConnection(function (err, db) {
    db.query(q, [ExpenseNumberID], (err, data) => {
      if (err) {
        db.release();
        console.log(err);
        return res.json({ error: "DB connection refusal" });
      }
      if (data.length === 0) {
        db.release();
        return res.status(404).json("ExpenseNumberID not found ");
      }
      db.release();
      res.status(200).json({ success: "deleted an expense" });
    });
  });
});

// PATCH /api/users/expenses/update
export const updateExpense = asyncHandler(async (req, res) => {
  const ExpenseNumberID = req.body.ExpenseNumberID;
  const amount = req.body.amount;
  if (!ExpenseNumberID) {
    throw new Error("Please enter which particular expense need to be deleted");
  }
  let q = `UPDATE expenses SET amount = ? WHERE ExpenseNumberID = ?;`;
  pool.getConnection(function (err, db) {
    db.query(q, [amount, ExpenseNumberID], (err, data) => {
      if (err) {
        db.release();
        console.log(err);
        return res.json({ error: "DB connection refusal" });
      }
      if (data.length === 0) {
        db.release();
        return res.status(404).json("ExpenseNumberID not found ");
      }
      db.release();
      res.status(200).json({ success: "updated an expense" });
    });
  });
});
