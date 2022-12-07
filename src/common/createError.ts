export class errorStatusCode extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = 400
  }
}


export class BadRequestExceptions extends errorStatusCode {
  constructor(message: string) {
    super(message)
    this.name = "Bad Request"
  }
}


export class RegExpError extends errorStatusCode {
  constructor(message: string) {
    super(message)
    this.name = "Regular Expresstion Error"
  }
}


export class keyError extends errorStatusCode {
  constructor(message: string) {
    super(message)
    this.name = "Duplication Check Key Error"
  }
}


export class PwMismatchError extends errorStatusCode {
  constructor(message: string) {
    super(message)
    this.name = "Password Mismatch Error"
  }
}


export class NotFoundError extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Not Found Error"
    this.statusCode = 404
  }
}


export class DuplicateError extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Duplicate Error"
    this.statusCode = 409
  }
}


export class UnauthorizedExecption extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Unauthorized"
    this.statusCode = 401
  }
}
