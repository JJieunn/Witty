class  RegExpError extends Error {
  private statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "Regular Expresstion Error"
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

export { RegExpError, NotFoundError, DuplicateError}