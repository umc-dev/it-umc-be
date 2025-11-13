import HttpException from "./HttpException.ts";

export default class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}
