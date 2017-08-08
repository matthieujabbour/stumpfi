/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


process.env.NODE_ENV = 'development';


import * as path from 'path';
import * as fs from 'fs-extra';
import * as webpack from 'webpack';
import config from '../config/webpack.config.dev';


const compiler : webpack.Compiler = webpack(config);
const distPath : string = path.resolve(__dirname, '../dist');
const packageJson : any = require('../package.json');


// `package.json` content used for distribution.
const distPackageJson : string = JSON.stringify({
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
.then(() => {
  compiler.watch({}, (error, stats) => {
    if (error) {
      console.error(error);
    } else {
      console.log(stats.toString('normal'));

      // Writing distributable `package.json` file into `dist` directory...
      try {
        fs.writeFileSync(path.join(distPath, 'package.json'), distPackageJson);
      } catch (fsError) {
        console.error(fsError.message);
      }
    }
  });
})
// If any error occurs...
.catch((error) => {
  console.error(error);
});
