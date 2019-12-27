
module.exports = {
    verbose: true,
    automock: false,
    moduleNameMapper: {
        '\\.(css)$': '<rootDir>/test/__mocks__/styleMock.js',
    },
    setupFilesAfterEnv: [
        './setupJestAfterEnv.js',
    ],
    setupFiles: [
        './setupJest.js',
    ],
};
