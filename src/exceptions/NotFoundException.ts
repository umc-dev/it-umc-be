import HttpException from "./HttpException.ts";

export default class NotFoundException extends HttpException {
  constructor(message = "Resource Not Found") {
    super(404, message);
  }
}
