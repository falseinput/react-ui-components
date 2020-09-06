const babel = require('rollup-plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const postcssNested = require('postcss-nested');
const svgr = require('@svgr/rollup').default;
const postcssVariables = require('postcss-css-variables');
const { terser } = require('rollup-plugin-terser');

const globals = {
    'prop-types': 'PropTypes',
    react: 'React',
};

const commonConfig = {
    external: Object.keys(globals),
    plugins: [
        babel({ exclude: ['node_modules/**'], runtimeHelpers: false }),
        resolve(),
        commonjs(),
        terser(),
        postcss({
            plugins: [
                postcssVariables,
                postcssNested,
            ],
            extract: true,
        }),
        svgr(),
    ],
};

export default [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            globals,
        },
        ...commonConfig,
    },
    {
        input: 'src/providers/tomtom/index.js',
        output: {
            file: 'dist/tomtom/index.js',
            format: 'cjs',
            globals,
        },
        ...commonConfig,
    },
];
