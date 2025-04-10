/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "allure-jest/node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};