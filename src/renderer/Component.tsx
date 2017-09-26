/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';
import Component from '../entities/Component';


/** Defines the Component's props type. */
interface ComponentProps {
  /** Component's data. */
  readonly data : Component;

  /** Whether the component belongs to a theme. */
  readonly 'data-theme' : boolean;
}


/**
 * Stumpfi component.
 * @returns {JSX.Element} The component's React element.
 */
export default class extends React.PureComponent<ComponentProps, {}> {

  public constructor(props : ComponentProps) {
    super(props);
  }


  public render() : JSX.Element {
    const data : Component = this.props.data;
    return (
      <div
        data-theme={this.props['data-theme']}
        data-component-id={data.getId()}
        data-content-id={data.getContent().getId()}
        className={data.getClassName()}
        style={data.getStyle()}
        dangerouslySetInnerHTML={{ __html: data.getContent().getHtml() }}
      />
    );
  }

}
