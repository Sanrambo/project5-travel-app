import "jest-fix-undefined"
const app = require("../server/index");
const req = require("supertest");



describe("It shouldl load successfully", () => {
    test("Is the response working? ", async () => {
        const res = await req(app).get("/traveling");
        expect(res.statusCode).toBe(200);
    });
});