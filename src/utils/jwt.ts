import jwt, { SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";

// helper function to safely cast expiry


const generateAccessToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY as StringValue
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, options);
};

const generateRefreshToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY as StringValue
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, options);
};

const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};


const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};


export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
