export default class HttpException extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;

    // stack trace
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}
