import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  //testEnvironment: 'node',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/?(*.)+(spec|test).+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};

export default jestConfig;
