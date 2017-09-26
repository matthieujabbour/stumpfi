/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';
import Document from '../entities/Document';
import Page from './Page';
import Resource from './Resource';


/** Defines the Document's props type. */
interface DocumentProps {
  /** Document's data. */
  readonly data : Document;
}


/**
 * Stumpfi document.
 * @returns {JSX.Element} The document's React element.
 */
export default class extends React.PureComponent<DocumentProps, {}> {

  public constructor(props : DocumentProps) {
    super(props);
  }


  public render() : JSX.Element {
    const data : Document = this.props.data;
    // Default iframe style.
    const defaultStyle : string = 'iframe[data-page-id]{border: none;}';

    return (
      <html>
        <head>
          <title>{data.getName()}</title>
          <meta charSet="UTF-8" />
          <meta name="generator" content={`stumpfi ${process.env.PACKAGE_VERSION}`} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content={data.getDescription()} />
          <meta name="keywords" content={data.getTags().join(' ')} />
          <meta name="author" content={data.getAuthors().join(', ')} />
          <style type="text/css" dangerouslySetInnerHTML={{ __html: defaultStyle }} data-default />
          {data.getResources().map((resource, index) => <Resource data={resource} key={index} />)}
          <noscript>
            Javascript is currently not enabled on your browser, this may cause the document not
            render correctly.
          </noscript>
        </head>
        <body>
          {data.getPages().map((page, index) => <Page data={page} key={index} />)}
        </body>
    </html>
    );
  }

}
