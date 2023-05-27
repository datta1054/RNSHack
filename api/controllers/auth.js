// dependencies
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

//imports
import { pool } from "../utils/connectDb.js";

//supporting functions
const generateTokenAuth = (id) => {
  return jwt.sign({ id }, "hackathon", {
    expiresIn: "30d",
  });
};

//controllers
//register
export const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body.displayName);
  console.log(req.body.email);
  console.log(req.body.password);
  const { phone, displayName, email, password } = req.body;
  //validation
  if (!phone || !displayName || !email || !password)
    throw new Error("Please Enter All The Details");

  //check if the user has already register
  let q = `select * from users where email = ?`;
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [req.body.email], (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ err });
      }
      if (data.length) return res.status(409).json("user already exists");
      // hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      q =
        "insert into users(displayName,email,password,phone,photoURL) values (?)";
      const values = [
        req.body.displayName,
        req.body.email,
        hash,
        req.body.phone,
        req.body.photoURL,
      ];
      console.log(values);
      db.query(q, [values], (err, data) => {
        if (err) {
          db.release();
          return res.json({ err });
        }
        res.status(201).json({
          token: generateTokenAuth(uuidv4()),
        });
      });
    });
  });
});

//login
export const loginUser = asyncHandler(async (req, res) => {
  let q = `select * from users where email = ?`;
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [req.body.email], (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ err });
      }
      const user_password = req.body.password;
      if (data.length === 0) {
        db.release();
        return res
          .status(404)
          .json("Email hasn't register Please register first");
      }
      // compare password
      console.log(user_password);
      if (user_password) {
        const isPasswordCorrect = bcrypt.compareSync(
          user_password,
          data[0].password
        ); // true;

        if (!isPasswordCorrect) {
          db.release();
          return res.status(404).json("Either Password or email is wrong");
        }
        res.status(201).json({
          token: generateTokenAuth(uuidv4()),
        });
      }
    });
  });
});

// private get this made private by adding a middleware in the router file
//which will see the token which is passed in the headers (Bearer token) and verifies it using jwt.verify(token,with the signature of token)
// route /api/users/me
// export const getMe = asyncHandler(async (req, res) => {
//   const { _id, name, email } = await User.findById(req.user.id);
//   res.status(200).json({ id: _id, name, email });
// });
