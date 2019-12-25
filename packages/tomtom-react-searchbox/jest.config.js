
module.exports = {
    verbose: true,
    automock: false,
    moduleNameMapper: {
        '\\.(css)$': '<rootDir>/test/__mocks__/styleMock.js',
    },
    setupFiles: [
        './setupJest.js',
    ],
};
