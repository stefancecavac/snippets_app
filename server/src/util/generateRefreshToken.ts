import jwt from "jsonwebtoken";

export const generateRefreshToken = (id: string) => {
  const refreshToken = jwt.sign({ userId: id }, process.env.REFRESH_TOKEN_KEY as string, { expiresIn: "3d" });
  return refreshToken;
};
