import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import expensesRoutes from "./Routes/expensesRoute.js";
import incomesRoutes from "./Routes/incomeRoute.js";
import budgetRoutes from "./Routes/budgetRoute.js";
import { pool } from "./utils/connectDb.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Express server!");
});
app.use("/api/users", userRoutes);
app.use("/api/users/expenses", expensesRoutes);
app.use("/api/users/incomes", incomesRoutes);
app.use("/api/users/budget", budgetRoutes);
app.post("/api/alert", async (req, res) => {
  const email = req.body.email;
  if (!email) throw new Error("Please send email");

  const expense_query = `select sum(amount) as expense_amount from expenses where user_email =  ?`;
  const income_query = `select sum(income) as income_amount from incomes where user_email =  ?`;
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
      const expense_amount = expense_data[0].expense_amount;
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
        const income_amount = income_data[0].income_amount;
        res.status(201).json({
          expense_amount: expense_amount,
          income_amount: income_amount,
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
