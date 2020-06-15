import app from "app";
import request from "supertest";
import { setupDatabase, closeDatabase, clearDatabase } from 'test/setup/mongo-mem-server';

beforeAll(async () => await setupDatabase());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("Api Testing", () => {
  it("POST /api/v1/import should return a 400 when a file and provide is not provided", async (done) => {
    const response = await request(app).post("/api/v1/import").expect(400)
    done();
  });

  it("POST /api/v1/import should import csv data WITH header format", async (done) => {
    const response = await request(app)
      .post("/api/v1/import")
      .attach("file", "test/fixtures/withHeader.csv")
      .field("provider", "withHeader")
      .expect(200);
    done();
  });

  it("POST /api/v1/import should import csv data WITHOUT header format", async (done) => {
    const response = await request(app)
      .post("/api/v1/import")
      .field("provider", "withoutHeader")
      .attach("file", "test/fixtures/withoutHeader.csv")
      .expect(200);
    done();
  });
});
