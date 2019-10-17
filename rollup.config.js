import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import sass from 'rollup-plugin-sass';

export default {
  input: [
    'packages/SelectTemplate/SelectTemplate.js',
    'packages/crud/crud.js',
    'packages/crud/crudBeforeMiddleware.js',
    'packages/crud/crudAfterMiddleware.js',
    'packages/crud/crudReducer.js',
    'packages/flat/flat.js',
    'packages/NotificationTemplate/notification.js',
    'packages/MainTable/MainTable.js',
    'packages/MainTable/mainTableActions.js',
    'packages/MainTable/mainTableReducer.js',
    'packages/MainTable/mainTableMiddleware.js',
    'packages/MainTable/FilterColumns.js',
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
      name: 'crudBeforeMiddleware',
      dir: 'public/packages',
      format: 'cjs'
    },
    {
      name: 'crudAfterMiddleware',
      dir: 'public/packages',
      format: 'cjs'
    },
    {
      name: 'crudReducer',
      dir: 'public/packages',
      format: 'cjs'
    },
    {
      name: 'flat',
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
      name: 'mainTableActions',
      dir: 'public/packages',
      format: 'cjs'
    },
    {
      name: 'mainTableReducer',
      dir: 'public/packages',
      format: 'cjs'
    },
    {
      name: 'mainTableMiddleware',
      dir: 'public/packages',
      format: 'cjs'
    },
    {
      name: 'FilterColumns',
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
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    commonjs(),
    uglify()
  ]
};
