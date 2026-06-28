import nextJest from "next/jest.js";
import * as pathImport from "path";
import { readFileSync } from "fs";

const ROOT_PATH = "<rootDir>/";

const tsconfigPath = pathImport.resolve(".", "tsconfig.json");

const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf8"));

function makeModuleNameMapper() {
  // Get paths from tsconfig
  const { paths } = tsconfig.compilerOptions;

  const aliases = {};

  // Iterate over paths and convert them into moduleNameMapper format
  Object.keys(paths).forEach((item) => {
    const key = item.replace("/*", "/(.*)");
    const path = paths[item][0].replace("/*", "/$1");
    aliases[key] = `${ROOT_PATH}/${path}`;
  });
  return aliases;
}

const createJestConfig = nextJest({
  dir: "./src",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: makeModuleNameMapper(),
  testEnvironment: "jest-environment-jsdom",
};

export default createJestConfig(config);
