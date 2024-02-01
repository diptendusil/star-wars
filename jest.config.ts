import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
  testMatch: ['<rootDir>/src/tests/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/tests/mocks/styleMock.ts',
  },
}

export default config
