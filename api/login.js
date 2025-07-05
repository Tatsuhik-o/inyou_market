import { LoginSchema } from "../helpers/schema.js";
import dbConnection from "../helpers/dbConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { serialize } from "cookie";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  let { email, password } = req.body;

  const verifSchema = LoginSchema.safeParse({ email, password });
  if (!verifSchema.success)
    return res.status(400).json({ message: "Bad request" });

  try {
    const connection = await dbConnection();
    const fetchPWQuery = `SELECT hashed_password, first_name from accounts where email = ?`;
    const [rows] = await connection.query(fetchPWQuery, [email]);
    if (!rows.length) return res.status(401).json({ message: "Unauthorized" });

    const { hashed_password, first_name } = rows[0];
    const pwMatch = await bcrypt.compare(password, hashed_password);
    if (!pwMatch) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign({ first_name }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
    const myCookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 3,
    });

    res.setHeader("Set-Cookie", myCookie);
    return res.status(200).json({ message: "Login Successfull" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
