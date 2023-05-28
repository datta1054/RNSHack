// dependencies
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Mailjet from "node-mailjet";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'

//imports
import { pool } from "../utils/connectDb.js";

const P_APIKEY = "b410e3a463611f3f309c8780d23e3a74";
const S_APIKEY = "9cbfb22d92691595328e6c8d76637472";
const SENDER_MAIL = "shivu.a.1945@gmail.com";

const SECRET_KEY_ENC = "9cbfb22d92691595328e";
const mailjet = Mailjet.apiConnect(P_APIKEY, S_APIKEY);

//supporting functions
const generateTokenAuth = (id) => {
  return jwt.sign({ id }, "hackathon", {
    expiresIn: "30d",
  });
};

//controllers
//register
export const registerUser = asyncHandler(async (req, res) => {
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

      db.query(q, [values], (err, data) => {
        if (err) {
          db.release();
          return res.json({ err });
        }
        const gen_otp = generateOTP();
        console.log(gen_otp);
        console.log(email);
        mailjet.post("send", { version: "v3.1" }).request({
          Messages: [
            {
              From: { Email: SENDER_MAIL, Name: "Budget Tracker" },
              To: [{ Email: email }],
              Subject: "Signing up",
              TextPart: "verifying your email !!",
              HTMLPart: `
                <p> You requested a password Reset </p> 
                <p> Enter the following OTP to verify: </p>
                <h2>${gen_otp}</h2>
                `,
            },
          ],
        });
        // Encrypt OTP
        const encryptedOTP = CryptoJS.AES.encrypt(
          gen_otp,
          SECRET_KEY_ENC
        ).toString();
        res.status(201).json({
          token: generateTokenAuth(uuidv4()),
          encryptedOTP: encryptedOTP,
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

// Forgot password
function generateOTP() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

export const forgotpassword = asyncHandler(async (req, res) => {
  let q = `select * from users where email = ?`;
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [req.body.email], (err, data) => {
      if (err) {
        return res.json({ err });
      }
      const email = req.body.email;
      if (data.length === 0) {
        db.release();
        return res.status(404).json("This Email hasn't register");
      }
      const gen_otp = generateOTP();
      mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: { Email: SENDER_MAIL, Name: "Budget Tracker" },
            To: [{ Email: email }],
            Subject: "Password Reset",
            TextPart: "You've requested a password reset",
            HTMLPart: `
                <p> You requested a password Reset </p> 
                <p> Enter the following OTP to verify: </p>
                <h2>${gen_otp}</h2>
                `,
          },
        ],
      });
      // Encrypt OTP
      const encryptedOTP = CryptoJS.AES.encrypt(
        gen_otp,
        SECRET_KEY_ENC
      ).toString();
      //Send enc otp
      res.status(201).json({
        encryptedOTP: encryptedOTP,
      });
    });
  });
});

export const verifyOTP = (encOTP, otp) => {
  const decOTP = CryptoJS.AES.decrypt(encOTP, SECRET_KEY_ENC).toString(
    CryptoJS.enc.Utf8
  );
  if (otp === decOTP) {
    return true;
  } else {
    return false;
  }
};

// Update password
export const updatePassword = asyncHandler(async (req, res) => {
  const encOTP = req.body.encryptedOTP;
  const otp = req.body.otp;
  const email = req.body.email;
  const user_password = req.body.password;
  if (verifyOTP(encOTP, otp)) {
    let q = `select * from users where email = ?`;
    let update_query = `Update users set password = ? where email = ?`;
    pool.getConnection(function (err, db) {
      if (err) return res.json(err);

      db.query(q, [email], (err, data) => {
        if (err) {
          return res.json({ err });
        }
        // hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user_password, salt);
        db.query(update_query, [hash, email], (err, data) => {
          if (err) {
            return res.status(404).json("Couldn't update password !!");
          }
          db.release();
          return res.status(201).json("Password updated Successfully !!");
        });
      });
    });
  } else {
    return res.status(201).json("OTP doesn't match!!");
  }
});

export const verifyOTPforEmail = asyncHandler(async (req, res) => {
  const encOTP = req.body.encryptedOTP;
  const otp = req.body.otp;
  const email = req.body.email;
  if (verifyOTP(encOTP, otp)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
    const q = `DELETE FROM users WHERE email = ?;`;
    pool.getConnection(function (err, db) {
      if (err) return res.json(err);
      db.query(q, [email], (err, data) => {
        if (err) {
          db.release();
          return res.json({ success: false });
        }
        db.release();
        res.json({ success: true });
      });
    });
  }
});

export const reportPdf = (req, res) => {
  const user_email = req.body.email
  if (!user_email) {
    return res.status(400).json("Need to login !!")
  }
  let currentDate = new Date().toJSON().slice(0, 10);
  const reportName = 'Report-' + currentDate + '.pdf'
  console.log(reportName)

  let totalExpense = 0, totalIncome = 0, totalBudget = 0;
  // Write total income
  let q = `select sum(income) as income_amt from incomes where user_email = ?`;
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [user_email], (err, data) => {
      if (err) {
        db.release();
        return res.json({ err });
      }
      totalIncome = data[0]['income_amt']
      q = `select sum(amount) as expense_amt from expenses where user_email = ?`;
      pool.getConnection(async function (err, db) {
        if (err) return res.json(err);
        db.query(q, [user_email], (err, data) => {
          if (err) {
            db.release()
            return res.json({ err });
          }
          totalExpense = data[0]['expense_amt']
          const invoicePath = path.join('utils', 'reports', reportName)
          const pdfDoc = new PDFDocument()
          pdfDoc.pipe(fs.createWriteStream(invoicePath))
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', 'inline; filename="' + reportName + '"')
          pdfDoc.fontSize(26).text('Budget Tracker', { underline: true, align: 'center' })
          pdfDoc.pipe(res)
          pdfDoc.fontSize(26).text('Report', { underline: true })
          pdfDoc.text('---------------------------------------------------')

          console.log(totalExpense + ", " + totalIncome)
          pdfDoc.fontSize(22).text('Total Income : ' + '$' + +totalIncome)
          pdfDoc.fontSize(22).text('Total Expense : ' + '$' + +totalExpense)
          pdfDoc.text('-------------------------------------------------------------------')
          pdfDoc.fontSize(24).text('Total Savings :  ' + '$' + +(totalIncome - totalExpense))
          pdfDoc.end()
        });
      })
    });
  })
}