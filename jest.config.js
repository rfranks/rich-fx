module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/tests/**/*.test.ts", "**/tests/**/*.test.tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^uuid$": "<rootDir>/tests/mocks/uuidMock.ts",
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/mocks/styleMock.ts",
  },
  testPathIgnorePatterns: [
    "/tests/resumeIngest.test.ts",
    "/tests/useDimensions.test.ts",
  ],
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "mts",
    "json",
    "node",
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  transform: {
    "^.+\\.(ts|tsx|mts)$": [
      "ts-jest",
      {
        tsconfig: {
          module: "commonjs",
          jsx: "react-jsx",
        },
      },
    ],
  },
};
