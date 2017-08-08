/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


process.env.NODE_ENV = 'production';


import * as path from 'path';
import * as fs from 'fs-extra';
import * as webpack from 'webpack';
import config from '../config/webpack.config.prod';


const compiler : webpack.Compiler = webpack(config);
const distPath : string = path.resolve(__dirname, '../dist');
const packageJson : any = require('../package.json');


// `package.json` content used for distribution.
const distPackageJson : string = JSON.stringify({
  main: './main.js',
  name: packageJson.name,
  bugs: packageJson.bugs,
  author: packageJson.author,
  version: packageJson.version,
  engines: packageJson.engines,
  licence: packageJson.licence,
  keywords: packageJson.keywords,
  homepage: packageJson.homepage,
  repository: packageJson.repository,
  description: packageJson.description,
  contributors: packageJson.contributors,
  dependencies: packageJson.dependencies,
});


// Removing existing `dist` directory...
fs.remove(distPath)
// Running webpack compiler...
.then(() => new Promise<webpack.Stats>((resolve, reject) => {
  compiler.run((error, stats) => (error ? reject(error) : resolve(stats)));
}))
// Displaying webpack compilation stats...
.then((stats) => {
  console.log(stats.toString('normal'));
})
// Writing distributable `package.json` file into `dist` directory...
.then(() => fs.writeFileSync(path.join(distPath, 'package.json'), distPackageJson))
// All went well...
.then(() => {
  console.log('DONE.');
})
// If any error occurs...
.catch((error) => {
  console.error(error);
});
