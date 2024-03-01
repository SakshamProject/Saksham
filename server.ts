import express from "express";
import config from "./config.js";
import apiRouter from "./src/routes/api.js";

const server = express();

server.use("/api", apiRouter);

server.listen(config.PORT, () => {
    console.log(`Server is listening at PORT: ${config.PORT}`);
});