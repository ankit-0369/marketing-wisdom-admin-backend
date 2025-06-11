import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyAccessToken } from "../utils/jwt";

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "No token provided or invalid token format");
  }

  const token = authHeader.split(" ")[1];

  // Ensure the token is provided
  if (!token) {
    throw new ApiError(401, "No token provided");
  }

  // Ensure that the secret is defined and valid
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new ApiError(500, "Server configuration error: ACCESS_TOKEN_SECRET not defined");
  }

  // Decode and verify the token
  const decoded = jwt.verify(token, secret) as JwtPayload;

  // Attach the decoded user information to the request object
  req.user = decoded;

  // Continue to the next middleware or route handler
  next();
});

export { verifyJWT };
