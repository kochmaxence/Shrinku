class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;

    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);

    // this.stack = (new Error(message)).stack;
  }
}


exports.MissingArgumentsError = class MissingArgumentsError extends BaseError {};
