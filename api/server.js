import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import expensesRoutes from "./Routes/expensesRoute.js";

const app = express();
const port = 3001;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, Express server!");
});
app.use("/api/users", userRoutes);
app.use("/api/users/expenses", expensesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
