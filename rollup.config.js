import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: ['packages/SelectTemplate/SelectTemplate.js', 'packages/crud/crud.js'],
  output: [
    {
      name: 'SelectTemplate',
      dir: 'public/packages',
      format: 'cjs'
    },
    {
      name: 'crud',
      dir: 'public/packages',
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
  ]
};
