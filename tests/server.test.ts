import supertest from "supertest";
import {StatusCodes} from "http-status-codes";
import {expect} from "chai";
import server from "../server.js";

const testServer = supertest("");
describe("# Server", () => {
    describe("GET /api/check", () => {

        it ("Should check if the API is alive", async () => {
            try {
                const response = await testServer.get("/api/check");
                expect(response.status).to.be.equal(StatusCodes.OK);
            }
            catch (error) {
                console.log(error);
            }
        });

    });
});

export default testServer;