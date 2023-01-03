import { Request, Response } from "express"
import { asyncWrap } from "../common/asyncWrap";
import searchService from "../services/searchService"




const getPostByKeyword = asyncWrap (async (req: Request, res: Response) => {
  const userId: number | null = req.body.foundUser;
  const offset = req.query.offset;
  const keyword = req.query;


  if(Object.keys(keyword).includes("q")) {
    const result = await searchService.getPostByKeyword(userId, keyword, offset)
    res.status(200).json(result)
  }
  else if(Object.keys(keyword).includes("category")) {
    const result = await searchService.getPostByCategory(userId, keyword, offset)
    res.status(200).json(result)
  }
})


const getUserByKeyword = asyncWrap (async (req: Request, res: Response) => {
  const keyword = req.query;
  const offset = req.query.offset;

  const result = await searchService.getUserByKeyword(keyword, offset)
  res.status(200).json(result)
})


const getCategoryByKeyword = asyncWrap (async (req: Request, res: Response) => {
  const userId: number | null = req.body.foundUser;
  const keyword = req.query;
  const offset = req.query.offset;
  
  const result = await searchService.getCategoryByKeyword(userId, keyword, offset)
  res.status(200).json(result)
})


export default {
  getPostByKeyword,
  getUserByKeyword,
  getCategoryByKeyword
}