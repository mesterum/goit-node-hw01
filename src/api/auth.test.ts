import express from 'express'

import UserSchema, { User } from '../service/schemas/user.js';

import request from "supertest";
import router from "./auth.js";

import mockingoose from '../mockingoose.js';
// jest.mock("../service/schemas/user.js")

const app = express();
app.use(express.json());
app.use("/", router);

describe("User API (mocked)", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it("should return token and user (/login)", async () => {
    const credentials = {
      "email": "a.cross1@gmail.com",
      "password": "examplepwd12345"
    }
    const { email, password } = credentials
    const newUser = new UserSchema({ email })
    await newUser.setPassword(password)
    mockingoose(UserSchema).toReturn(newUser, "findOne");
    // UserSchema.findOne = jest.fn(async () => Promise.resolve(newUser))

    const response = await request(app).post("/login").send(credentials).expect(200);

    const result = {
      "token": expect.any(String),
      "user": {
        "email": credentials.email,
        "subscription": "starter"
      }
    }
    expect(response.body).toMatchObject(result);
  });
});


