/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  roots: ['<rootDir>'],
  verbose: true,
  // Allow importing app from server.js without starting an extra listener in tests
  // server.js exports the Express app as module.exports = app;
  collectCoverageFrom: [
    'routes/**/*.js',
    'models/**/*.js',
    'server.js'
  ],
};

