import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import sass from 'rollup-plugin-sass';

export default {
  input: [
    'packages/SelectTemplate/SelectTemplate.js',
    'packages/crud/crud.js',
    'packages/Notification/notification.js',
    'packages/MainTable/MainTable.js',
    'packages/Checkbox/Checkbox.js'
  ],
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
    },
    {
      name: 'notification',
      dir: 'public/packages',
      format: 'cjs'
    },
    {
      name: 'MainTable',
      dir: 'public/packages',
      format: 'cjs'
    },
    {
      name: 'Checkbox',
      dir: 'public/packages',
      format: 'cjs'
    }
  ],
  external: [
    'react',
    'react-router-dom',
    'redux',
    'react-redux',
    'react-router-dom',
    'react-select',
    'react-proptypes'
  ],
  plugins: [
    sass({
      insert: true
    }),
    resolve(),
    babel({
      exclude: /node_modules/,
      runtimeHelpers: true
    }),
    commonjs({
      namedExports: {
        'react-dom': ['createPortal', 'findDOMNode']
      }
    }),
    uglify()
  ]
};
