import supertest from "supertest";
import {StatusCodes} from "http-status-codes";
import config from "../config.js";
import { expect } from "chai";
import server from "../server.js";

const testServer = supertest(server);
describe("# Server", () => {
    describe("GET /api/check", () => {

        it ("Should check if the API is alive", async () => {
            const response = await testServer.get("/check");
            expect(response.status).to.be.equal(StatusCodes.OK);
        });

    });
});

export default testServer;