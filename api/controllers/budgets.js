//dependencies
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

//imports
import { pool } from "../utils/connectDb.js";
//GET /api/users/budget/all
export const getAllBudgetsOfAUser = asyncHandler(async (req, res) => {
  const user_email = req.body.email;
  if (!user_email) {
    throw new Error("Please Enter All The Details");
  }
  let q = `select * from budget where user_email = ?`;
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
          .status(201)
          .json(
            "Email hasn't register Please register first or there are no budget"
          );
      }

      db.release();
      res.status(200).json({ data: data });
    });
  });
});

//GET /api/users/budget/get_budget

export const getABudgetOfUser = asyncHandler(async (req, res) => {
  const user_email = req.body.email;
  const BudgetNumberID = req.body.BudgetNumberID;
  if (!user_email || !BudgetNumberID) {
    throw new Error("Please Enter All The Details");
  }
  let q = `select * from budget where user_email = ? and BudgetNumberID = ?`;
  pool.getConnection(function (err, db) {
    db.query(q, [user_email, BudgetNumberID], (err, data) => {
      if (err) {
        db.release();
        console.log(err);
        return res.json({ error: "DB connection refusal" });
      }
      if (data.length === 0) {
        db.release();
        return res.status(404).json("didn't find a budget like that");
      }
      db.release();
      res.status(200).json({ data: data });
    });
  });
});
//POST /api/users/budget/add_a_budget
export const addAnItemToABudget = asyncHandler(async (req, res) => {
  const user_email = req.body.email;
  if (!user_email) {
    throw new Error("Please email");
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
        "insert into budget(BudgetNumberID,amount,name_of_budget,curr_date,user_email) values (?)";
      const values = [
        uuidv4(),
        req.body.amount,
        req.body.name_of_budget,
        date,
        user_email,
      ];
      db.query(q, [values], (err, data) => {
        if (err) {
          db.release();
          return res.json({ err });
        }
        db.release();
        res.status(200).json({ success: "added a new item to Budget" });
      });
    });
  });
});
// DELETE /api/users/budget/delete
export const deleteAnItemToABudget = asyncHandler(async (req, res) => {
  const BudgetNumberID = req.body.BudgetNumberID;
  if (!BudgetNumberID) {
    throw new Error("Please enter which particular budget need to be deleted");
  }
  let q = `DELETE FROM budget WHERE BudgetNumberID = ?;
`;
  pool.getConnection(function (err, db) {
    db.query(q, [BudgetNumberID], (err, data) => {
      if (err) {
        db.release();
        console.log(err);
        return res.json({ error: "DB connection refusal" });
      }
      if (data.length === 0) {
        db.release();
        return res.status(404).json("BudgetNumberID not found ");
      }
      db.release();
      res.status(200).json({ success: "deleted a budget" });
    });
  });
});

// PATCH /api/users/budget/update
export const updateAnItemToABudget = asyncHandler(async (req, res) => {
  const BudgetNumberID = req.body.BudgetNumberID;
  const amount = req.body.amount;
  if (!BudgetNumberID || !amount) {
    throw new Error("Please enter which particular budget need to be deleted");
  }
  let q = `UPDATE budget SET amount = ? WHERE BudgetNumberID = ?;`;
  pool.getConnection(function (err, db) {
    db.query(q, [amount, BudgetNumberID], (err, data) => {
      if (err) {
        db.release();
        console.log(err);
        return res.json({ error: "DB connection refusal" });
      }
      if (data.length === 0) {
        db.release();
        return res.status(404).json("BudgetNumberID not found ");
      }
      db.release();
      res.status(200).json({ success: "updated an Budget" });
    });
  });
});
