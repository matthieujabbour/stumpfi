/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';
import Component from './Component';
import Page from '../entities/Page';
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

    return (dataTheme === null)
      ? (
        <section data-page-id={data.getId()}>
          {themeHtmlComponents}
          {pageHtmlComponents}
        </section>
      )
      : (
        <section data-page-id={data.getId()} data-theme-id={dataTheme.getId()}>
          {themeHtmlComponents}
          {pageHtmlComponents}
        </section>
      );
  }

}
