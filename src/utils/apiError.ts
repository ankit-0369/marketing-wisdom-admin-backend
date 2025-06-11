class ApiError extends Error {
  statusCode: number;
  data: any;
  success: boolean;
  errors: any[];

  constructor(
    statusCode: number,
    message = "Default wrong message from ApiError class",
    errors: any[] = [],
    data: any = null,
    stack = ""
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;
    this.success = false;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
