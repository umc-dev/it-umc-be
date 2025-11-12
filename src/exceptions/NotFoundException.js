import HttpException from "./HttpException.js";

export default class NotFoundException extends HttpException {
  constructor(message = "Resource Not Found") {
    super(404, message);
  }
}
