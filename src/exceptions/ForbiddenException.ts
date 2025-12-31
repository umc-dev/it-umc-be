import HttpException from "./HttpException";

export default class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}
