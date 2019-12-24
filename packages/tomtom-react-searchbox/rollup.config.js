const babel = require('rollup-plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

const globals = {
    'prop-types': 'PropTypes',
    react: 'React',
};

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/tomtom-react-searchbox.js',
        name: 'tomtom-react-searchbox',
        format: 'umd',
        globals,
    },
    external: Object.keys(globals),
    plugins: [
        babel({ exclude: ['node_modules/**'], runtimeHelpers: false }),
        resolve(),
        commonjs(),
    ],
};
