import resolve from 'rollup-plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import sass from 'rollup-plugin-sass';

export default {
  input: [
    'packages/SelectTemplate/SelectTemplate.js',
    'packages/crud/crud.js',
    'packages/Notification/notification.js',
    'packages/MainTable/MainTable.js',
    'packages/Table/Table.js',
    'packages/Checkbox/Checkbox.js'
  ],
  output: [
    {
      name: 'SelectTemplate',
      dir: 'public/packages',
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      strict: false
    },
    {
      name: 'crud',
      dir: 'public/packages',
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      strict: false
    },
    {
      name: 'notification',
      dir: 'public/packages',
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      strict: false
    },
    {
      name: 'MainTable',
      dir: 'public/packages',
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      strict: false
    },
    {
      name: 'Table',
      dir: 'public/packages',
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      strict: false
    },
    {
      name: 'Checkbox',
      dir: 'public/packages',
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      strict: false
    }
  ],
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    'redux',
    'react-redux',
    'react-select',
    'react-proptypes'
  ],
  plugins: [
    sass({
      insert: true
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      skipPreflightCheck: true
    }),
    commonjs({
      namedExports: {
        'react-dom': ['createPortal', 'findDOMNode'],
        'react-is': Object.keys(require('react-is')),
      }
    }),
    uglify()
  ]
};
