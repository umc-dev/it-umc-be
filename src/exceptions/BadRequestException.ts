import HttpException from "./HttpException.ts";

export default class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}
