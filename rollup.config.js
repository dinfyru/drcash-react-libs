import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: ['packages/SelectTemplate/index.js'],
  output: [
    {
      name: 'SelectTemplate',
      dir: 'public/packages/SelectTemplate',
      format: 'cjs'
    }
  ],
  external: ['react', 'react-select', 'react-proptypes'],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    commonjs(),
    uglify()
  ],
  experimentalCodeSplitting: true,
  experimentalDynamicImport: true
};
