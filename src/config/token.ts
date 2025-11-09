import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
export const generateToken = (userId: string, email: string) => {
  return jwt.sign(
    {
      user: userId,
      email: email,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const veryfyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
};
