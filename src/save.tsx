/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as fs from 'fs-extra';
import * as path from 'path';
import Document from './entities/Document';
import HtmlDocument from './renderer/Document';


/**
 * Saves the specified document into the given file.
 * @param {Document} document The stumpfi document to save.
 * @param {string} directoryPath Path to the directory into which to save the document.
 * @returns {void}
 */
export default function save(document : Document, directoryPath : string) : void {
  const htmlRoot : JSX.Element = <HtmlDocument data={document} />;
  const filePath : string = path.join(directoryPath, `${document.getName()}.html`);
  fs.writeFileSync(filePath, `<!DOCTYPE html>${ReactDOM.renderToStaticMarkup(htmlRoot)}`);
}
