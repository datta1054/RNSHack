import express from "express";
import { pool } from "./utils/connectDb.js";
import { registerUser, loginUser } from "./auth.js";
import userRoutes from "./Routes/userRoutes.js";

const app = express();
const port = 3001;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, Express server!");
});
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
