import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";
import { ApiError } from "../utils/apiError";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
    
  if (!result.isEmpty()) {
    return next(new ApiError(400, "Validation Failed", result.array()));
  }

  next();
};
