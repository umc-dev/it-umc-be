import HttpException from "./HttpException.js";

export default class InternalServerError extends HttpException {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}
