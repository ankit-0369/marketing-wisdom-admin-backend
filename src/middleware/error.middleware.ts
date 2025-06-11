import { Request, Response, NextFunction } from "express";
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];
  let data = err.data || null;

  // Prisma connection/init error (e.g., Neon down or wrong env vars)
  if (err instanceof PrismaClientInitializationError) {
    message = "Failed to connect to the database. Please try again later.";
    statusCode = 500;
  }

  // Prisma known request error (e.g., P2025: record not found)
  if (err instanceof PrismaClientKnownRequestError) {
    message = "A database error occurred.";
    statusCode = 500;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    data,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
