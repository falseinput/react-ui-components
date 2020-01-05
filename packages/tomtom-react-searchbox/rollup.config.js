const babel = require('rollup-plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const postcssNested = require('postcss-nested');
const svgr = require('@svgr/rollup').default;
const postcssVariables = require('postcss-css-variables');

const globals = {
    'prop-types': 'PropTypes',
    react: 'React',
};

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/tomtom-react-searchbox.js',
        name: 'tomtom-react-searchbox',
        format: 'cjs',
        globals,
    },
    external: Object.keys(globals),
    plugins: [
        babel({ exclude: ['node_modules/**'], runtimeHelpers: false }),
        resolve(),
        commonjs(),
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
