//dependencies
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

//imports
import { pool } from "../utils/connectDb.js";
//POST /api/users/incomes/add
export const addIncome = asyncHandler(async (req, res) => {
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
        "insert into incomes(IncomeNumberId,income,description,date,user_email) values (?)";
      const values = [
        uuidv4(),
        req.body.income,
        req.body.description,
        date,
        user_email,
      ];
      db.query(q, [values], (err, data) => {
        if (err) {
          db.release();
          return res.json({ err });
        }
        db.release();
        res.status(200).json({ success: "added income" });
      });
    });
  });
});

//GET /api/users/incomes

export const getAllIncomes = asyncHandler(async (req, res) => {
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

      q = "select * from incomes where user_email = ?";

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

// DELETE /api/users/incomes/delete
export const deleteIncome = asyncHandler(async (req, res) => {
  const IncomeNumberId = req.body.IncomeNumberId;
  if (!IncomeNumberId) {
    throw new Error("Please enter which particular expense need to be deleted");
  }
  let q = `DELETE FROM incomes WHERE IncomeNumberId = ?;
`;
  pool.getConnection(function (err, db) {
    db.query(q, [IncomeNumberId], (err, data) => {
      if (err) {
        db.release();
        console.log(err);
        return res.json({ error: "DB connection refusal" });
      }
      if (data.length === 0) {
        db.release();
        return res.status(404).json("IncomeNumberId not found ");
      }
      db.release();
      res.status(200).json({ success: "deleted an income" });
    });
  });
});

// PATCH /api/users/incomes/update
export const updateIncome = asyncHandler(async (req, res) => {
  const IncomeNumberId = req.body.IncomeNumberId;
  const income = req.body.income;
  if (!IncomeNumberId) {
    throw new Error("Please enter which particular expense need to be deleted");
  }
  let q = `UPDATE incomes SET income = ? WHERE IncomeNumberId = ?;`;
  pool.getConnection(function (err, db) {
    db.query(q, [income, IncomeNumberId], (err, data) => {
      if (err) {
        db.release();
        console.log(err);
        return res.json({ error: "DB connection refusal" });
      }
      if (data.length === 0) {
        db.release();
        return res.status(404).json("IncomeNumberId not found ");
      }
      db.release();
      res.status(200).json({ success: "updated an income" });
    });
  });
});
