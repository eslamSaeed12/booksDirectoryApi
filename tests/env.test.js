import { expect, test } from "@jest/globals";
import { env } from "../src/modules/@env/index.js";

test("Environment variables Helper Throws when key not exist", () => {
  const env_throws = () => env("XX_KEY_F");
  expect(env_throws).toThrow();
});

test("Environment variables Helper Throws when key isnt a string", () => {
  const env_throws = () => env([]);
  expect(env_throws).toThrow();
});

test("Environment variables Helper Returns an exist env variable", () => {
  expect(env("NODE_ENV")).toBeTruthy();
});
