import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string) => {
  const accessToken = jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_KEY as string, { expiresIn: "15m" });
  return accessToken;
};
