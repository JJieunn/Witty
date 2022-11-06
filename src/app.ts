import cors from "cors";
import express from "express";
import logger from "morgan";
import routes from "./routes/index"

const createApp = () => {

  const app = express()
  app.use(
    cors(), express.json(), logger("dev"), routes
  )

  return app;
}

export { createApp }