import mysql from "mysql";
// connection to AWS RDS
// export const pool = mysql.createPool({
//   host: process.env.AWS_DATABASE_ENDPOINT,
//   user: process.env.AWS_DATABASE_USER, //root
//   port: process.env.AWS_DATABASE_PORT, //3306
//   password: process.env.AWS_DATABASE_PASSWORD, //hackathon
//   database: process.env.AWS_DATABASE_DATABASE, //db
// });

export const pool = mysql.createPool({
  host: "hackathon.couwftbhaujy.ap-south-1.rds.amazonaws.com",
  user: "root", //root
  port: 3306, //3306
  password: "hackathon", //hackathon
  database: "db", //db
});
