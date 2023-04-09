const request = require("supertest");
const server = require("../../server");

describe("POST /users/login", () => {
  // beforeAll(async () => {
  //   await server.close();
  // });

  it("returns response status(200) with user and token", async () => {
    const testData = {
      password: "Saas777*777",
      email: "shiba@example.com",
    };

    const res = await request(server).post("/api/users/login").send(testData);

    expect(res.statusCode).toBe(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
        }),
      })
    );
  });

  it("returns unauthorized error", async () => {
    const testData = {
      password: "Saas777*77755",
      email: "shiba@example.com",
    };

    const res = await request(server).post("/api/users/login").send(testData);

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });

  it("returns unauthorized error", async () => {
    const testData = {
      password: "Saas777777",
      email: "shiba@example.com",
    };

    const res = await request(server).post("/api/users/login").send(testData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});
