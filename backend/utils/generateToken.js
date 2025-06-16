import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const { JWT_SECRET } = process.env;
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};
