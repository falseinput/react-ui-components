const presets = ['@babel/preset-react', [
        "@babel/preset-env",
        {
            modules: false,
            useBuiltIns: "usage",
            corejs: '3.6.0'
        }
    ]
];

module.exports = {
    presets
};
