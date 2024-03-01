import express from "express";
import config from "./config.js";

const server = express();

server.listen(config.PORT, () => {
    console.log(`Server is listening at port number : ${config.PORT}`);
});