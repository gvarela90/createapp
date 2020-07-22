// Ref: https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.js'],
  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: './__tests__/utils/globalSetup.js',

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  modulePathIgnorePatterns: [
    '__tests__/utils',
    '__tests__/mocks',
    '__tests__/.eslintrc.js',
  ],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./__tests__/utils/perSuiteSetup.js'],
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // This option allows use of a custom test runner
  testRunner: 'jest-circus/runner',
}
