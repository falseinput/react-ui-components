module.exports = (api) => {
    const babelPresetOptions = !api.env('test')
        ? {
            modules: false,
            useBuiltIns: 'usage',
            corejs: '3.6.0',
        } : {
            targets: {
                node: 'current',
            },
        };


    const presets = ['@babel/preset-react', [
        '@babel/preset-env',
        babelPresetOptions,
    ]];

    return {
        presets,
    };
};
