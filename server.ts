import express from "express";
import config from "./config.js";
import apiRouter from "./src/routes/api.js";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.js";
import errorHandler from "./src/middlewares/errorHandler/errorHandler.js";

const server = express();
server.use(cookieParser(config.SECRET));

server.use(
  cors({
    origin: "*",
  })
);

const accessLogStream = fs.createWriteStream(
  path.join(config.__dirname, "access.log"),
  { flags: "a" }
);
server.use(morgan("combined", { stream: accessLogStream }));

server.use("/api", apiRouter);
server.use("/auth", authRouter);
apiRouter.use(errorHandler);

server.listen(config.PORT, () => {
  console.log(`Server is listening at PORT: ${config.PORT}`);
});

export default server;
