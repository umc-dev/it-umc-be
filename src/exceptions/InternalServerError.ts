import HttpException from "./HttpException";

export default class InternalServerError extends HttpException {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}
