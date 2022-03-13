const request = require("supertest");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const app = require("../../app");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      // expect(response.statusCode).toBe(200);
    });
  });

  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "US Enterprise",
      rocket: "NCC 1701-V",
      target: "Kepler-62 f",
      launchDate: "January 4, 2029",
    };

    const launchDataWithoutDate = {
      mission: "US Enterprise",
      rocket: "NCC 1701-V",
      target: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "US Enterprise",
      rocket: "NCC 1701-V",
      target: "Kepler-62 f",
      launchDate: "hello",
    };

    test("It should respond with 201 created", async () => {
      // NOTE: SuperTest Expect
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);
      // expect(response).toBe(200);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      // NOTE: Jest Expect
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
