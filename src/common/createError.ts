class BadRequestExceptions extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Bad Request"
    this.statusCode = 400
  }
}

class RegExpError extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Regular Expresstion Error"
    this.statusCode = 400
  }
}

class keyError extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Duplication Check Key Error"
    this.statusCode = 400
  }
}

class NotFoundError extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Not Found Error"
    this.statusCode = 404
  }
}

class DuplicateError extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Duplicate Error"
    this.statusCode = 409
  }
}

class PwMismatchError extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Password Mismatch Error"
    this.statusCode = 400
  }
}

class UnauthorizedExecption extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Unauthorized"
    this.statusCode = 401
  }
}


export { 
  BadRequestExceptions,
  RegExpError,
  keyError,
  NotFoundError,
  DuplicateError,
  PwMismatchError,
  UnauthorizedExecption
}