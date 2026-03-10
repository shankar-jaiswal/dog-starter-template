import { describe, it, expect } from "vitest";
import request from "supertest";

const baseUrl = "http://localhost:5000";

describe("GET /api/dogs/random", () => {

  it("should return random dog image", async () => {

    const response = await request(baseUrl).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.imageUrl).toBeDefined();
    expect(typeof response.body.data.imageUrl).toBe("string");

  });

  it("should return 404 for invalid route", async () => {

    const response = await request(baseUrl).get("/api/dogs/invalid");

    expect(response.status).toBe(404);

  });

});