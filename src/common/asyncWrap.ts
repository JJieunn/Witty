import { Request, Response } from "express"

export const asyncWrap = (asyncController: Function) => {
  return async (req: Request, res: Response) => {
    try {
      await asyncController(req, res);
    } catch(err: any) {
      console.log(err)
      res.status(err.statusCode || 500).json({ err: err.message || "Internal Server Error" })
    }
  }
}