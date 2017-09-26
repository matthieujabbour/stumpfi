/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import Component from './Component';
import Page from '../entities/Page';
import Resource from './Resource';
import Theme from '../entities/Theme';


/** Defines the Page's props type. */
interface PageProps {
  /** Page's data. */
  readonly data : Page;
}


/**
 * Stumpfi page.
 * @returns {JSX.Element} The page's React element.
 */
export default class extends React.PureComponent<PageProps, {}> {

  public constructor(props : PageProps) {
    super(props);
  }


  public render() : JSX.Element {
    const data : Page = this.props.data;
    const dataTheme : Theme | null = data.getTheme();
    const themeHtmlComponents : JSX.Element[] = (dataTheme instanceof Theme)
      ? dataTheme.getComponents().map((component, index) => (
        <Component data={component} key={`th${index}`} data-theme />
      ))
      : [];
    const pageHtmlComponents : JSX.Element[] = [];
    data.getComponents().forEach((component, index) => {
      pageHtmlComponents.push(<Component data={component} key={index} data-theme={false} />);
    });


    // Generating theme resources...
    const resources : JSX.Element[] = (data.getTheme() !== null)
      ? (data.getTheme() as Theme).getResources().map((resource, index) => (
        <Resource data={resource} key={index} />
      ))
      : [];

    // This script is used to automatically scale page's font size to its width.
    const fontSizeScript : string = 'function scale() {' +
      'const fontSize = Math.min(16/9 * window.innerHeight / 100, window.innerWidth / 100);' +
      'document.body.style.fontSize = `${fontSize}px`;' +
    '}' +
    'window.addEventListener(\'resize\', scale); window.onload = scale;';

    // This style is used to automatically scale page's dimensions to frame size,
    // keeping the specified ratio.
    const defaultStyle : string = 'div[data-component-id]{overflow: auto; position: absolute;}' +
    'body{width: calc(16/9 * 100vh); height: calc(9/16 * 100vw); max-width: 100vw;' +
    'max-height: 100vh; position: relative;}';

    const srcDoc : string = `<!DOCTYPE html>${ReactDOM.renderToStaticMarkup(
      <html>
        <head>
          <style type="text/css" dangerouslySetInnerHTML={{ __html: defaultStyle }} data-default />
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: fontSizeScript }} data-default />
          {resources}
        </head>
        <body>
          {themeHtmlComponents}
          {pageHtmlComponents}
        </body>
      </html>,
    )}`;

    return (dataTheme === null)
      ? <iframe srcDoc={srcDoc} data-page-id={data.getId()} />
      : <iframe srcDoc={srcDoc} data-page-id={data.getId()} data-theme-id={dataTheme.getId()} />;
  }

}
