
module.exports = {
    verbose: true,
    automock: false,
    moduleNameMapper: {
        '\\.(css)$': '<rootDir>/test/__mocks__/styleMock.js',
        '\\.(svg)$': '<rootDir>/test/__mocks__/componentMock.js',
    },
    setupFilesAfterEnv: [
        './setupJestAfterEnv.js',
    ],
    setupFiles: [
        './setupJest.js',
    ],
};
