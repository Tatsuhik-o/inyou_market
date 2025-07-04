import { SignUpSchema } from "../helpers/schema.js";
import dbConnections from "../helpers/dbConnection.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  let myQueryData = req.body;

  if (myQueryData.password !== myQueryData.repeatPassword)
    return res.status(400).json({ message: "Bad Request" });

  if (!SignUpSchema.safeParse(myQueryData).success) {
    return res.status(400).json({ message: "Bad request" });
  }

  try {
    const connection = await dbConnections();

    const CheckQuery = `SELECT * FROM accounts WHERE email = ?`;
    const [verifResults] = await connection.query(CheckQuery, [
      myQueryData.email,
    ]);
    if (verifResults.length !== 0) {
      return res.status(409).json({ message: "Email Already exists" });
    }

    const SignUpQuery = `INSERT INTO accounts (email, hashed_password, first_name, last_name) VALUES (?, ?, ?, ?)`;
    const [results] = await connection.query(SignUpQuery, [
      myQueryData.email,
      await bcrypt.hash(myQueryData.password, 10),
      myQueryData.firstName,
      myQueryData.lastName,
    ]);
    if (results.affectedRows === 0) {
      return res.status(500).json({ message: "Failed To Sign Up" });
    }

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
