/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';
import * as packageJson from '../../package.json';
import Document from '../entities/Document';
import Page from './Page';


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

    // Rendering document's custom resources...
    const customResources : JSX.Element[] = data.getResources().map((resource, index) => {
      const innerHTML : { __html : string; } | undefined = (resource.content !== undefined)
        ? { __html: resource.content as string }
        : undefined;
      switch (resource.tagName) {
        case 'style':
          return <style {...resource.attributes} dangerouslySetInnerHTML={innerHTML} key={index} />;
        case 'script':
          return <script {...resource.attributes} dangerouslySetInnerHTML={innerHTML} key={index}/>;
        default:
          return <link {...resource.attributes} key={index} />;
      }
    });

    // Rendering all the sections' themes...
    // const themes :

    return (
      <html>
        <head>
          <title>{data.getName()}</title>
          <meta charSet="UTF-8" />
          <meta name="generator" content={`stumpfi ${packageJson.version}`} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content={data.getDescription()} />
          <meta name="keywords" content={data.getTags().join(' ')} />
          <meta name="author" content={data.getAuthors().join(', ')} />
          {customResources}
          <noscript>
            Javascript is currently not enabled on your browser, this may cause the document not
            render correctly.
          </noscript>
        </head>
        <body>
          <main>
            {data.getPages().map((page, index) => <Page data={page} key={index} />)}
          </main>
        </body>
    </html>
    );
  }

}
