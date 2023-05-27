import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import expensesRoutes from "./Routes/expensesRoute.js";
import incomesRoutes from "./Routes/incomeRoute.js";
import budgetRoutes from "./Routes/budgetRoute.js";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Express server!");
});
app.use("/api/users", userRoutes);
app.use("/api/users/expenses", expensesRoutes);
app.use("/api/users/incomes", incomesRoutes);
app.use("/api/users/budget", budgetRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
