import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/hash";

const prisma = new PrismaClient();

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    throw new ApiError(409, "Admin already exists with this email", [], {email});
  }

  const hashedPassword = await hashPassword(password);

  const admin = await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const payload = { id: admin.id, email: admin.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Save refresh token to HTTPOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { accessToken, admin: { id: admin.id, email: admin.email } },
        "Admin registered successfully"
      )
    );
});


const loginUser = asyncHandler(async (req: Request, res: Response) => {

  const { email, password } = req.body;
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    throw new ApiError(404, "Admin not found with this email", [], { email });
  }

  const isPasswordValid = await comparePassword(password, existingAdmin.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials", [], { email });
  }

  
  const payload = { id: existingAdmin.id, email: existingAdmin.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, admin: { id: existingAdmin.id, email: existingAdmin.email } },
        "Admin logged in successfully"
      )
    );
});


const refreshTokenController = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
    console.log("hitted", Date.now());
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token not found in request", [], { refreshToken });
  }

  
  let decoded: any;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token", [], { refreshToken });
  }

  
  const newAccessToken = generateAccessToken({ id: decoded.id, email: decoded.email });

  return res.status(200).json(
    new ApiResponse(200, { accessToken: newAccessToken }, "Access token refreshed successfully")
  );
});


const logoutController = asyncHandler(async (req: Request, res: Response) => {
  
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,  // Set maxAge to 0 to delete the cookie immediately
  });

  return res.status(200).json(
    new ApiResponse(200, null, "Logged out successfully")
  );
});


export { registerUser, loginUser, refreshTokenController, logoutController };
