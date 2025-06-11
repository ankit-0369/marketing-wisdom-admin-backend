import { Request, Response } from "express";
import { ApiResponse } from "../utils/apiResponse";

const healthCheck = (_req: Request, res: Response): void => {
  const healthStatus = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: new Date().toISOString(),
  };

  res
  .status(200)
  .json(new
     ApiResponse(200, healthStatus, "Health check passed")
    );
};

export { healthCheck };
