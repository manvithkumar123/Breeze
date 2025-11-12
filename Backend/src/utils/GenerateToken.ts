import jwt from "jsonwebtoken";

export const generateToken = (user: { email: string }) => {
  const secret = process.env.JWT_TOKEN;

  if (!secret) {
    throw new Error("JWT_TOKEN is not defined in environment variables");
  }

  return jwt.sign({ email: user.email }, secret, { expiresIn: "7d" });
};