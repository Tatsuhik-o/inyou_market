import { parse } from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });
  try {
    const cookie = parse(req.headers.cookie || "");
    const token = cookie.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const authorization = jwt.verify(token, process.env.SECRET_KEY);
    if (!authorization) {
      return res.status(401).json({ message: "Not authorized" });
    }
    return res.status(200).json({ user: authorization.first_name });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
