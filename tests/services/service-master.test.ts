import testServer from "../server.test.js";
import { clearTableDB } from "../../src/services/database/database.js";
import {expect} from "chai";
import {StatusCodes} from "http-status-codes";


describe("# Service Master", () => {
    describe("GET /services", () => {
        describe("No Data in Database / Response", () => {
            before(async () => {
                await clearTableDB(["service"]);
            });

            it("Should return empty array with default values", async () => {
                const response = await testServer.get("/services");
                expect(response.status).to.be.equal(StatusCodes.OK);
            });
        });
    });
});