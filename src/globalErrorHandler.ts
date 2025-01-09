import { NextFunction, Request, Response } from "express";

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

export abstract class CustomError extends Error {
  abstract status: string;
  private readonly statusCode: number;

  protected constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
}

export class ServerError extends CustomError {
  status = "error";
  constructor(message: string, statusCode?: number) {
    super(message, statusCode || 500);
  }
}

export const globalErrorHandler = async (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    if (err instanceof CustomError) {
      res.status(err.serializeErrors().statusCode).json(err.serializeErrors());
    }
    res.status(500).json({
      message: err?.message || "Server Error",
      statusCode: 500,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};
