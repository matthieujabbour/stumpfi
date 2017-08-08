/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as path from 'path';
import * as webpack from 'webpack';


// Library name.
const name : string = 'main';
// Used to specify to webpack that we only want to consider the files in `src` directory.
const src : string = path.resolve(__dirname, '../src');


// webpack's development configuration.
const developmentConfig : webpack.Configuration = {
  target: 'node',
  bail: false,
  cache: true,
  context: src,
  node: {
    __dirname: false,
  },
  entry: { [name]: './main.ts' },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    pathinfo: true,
    library: name,
    libraryTarget: 'commonjs2',
  },
  externals: {},
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '*'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [src],
        use: [
          // `awesome-typescript-loader` is first used, to compile Typescript into Javascript.
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
              configFileName: path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.json$/,
        include: [src],
        use: [{ loader: 'json-loader' }],
      },
    ],
  },
  plugins: [
    // Handles errors more cleanly and prevents Webpack from outputting anything into a bundle.
    new webpack.NoEmitOnErrorsPlugin(),
    // Makes some environment variables available to the JS code.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
  ],
};


export default developmentConfig;