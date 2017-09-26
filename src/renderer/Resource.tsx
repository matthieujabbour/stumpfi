/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';


/** Defines the Resource's props type. */
interface ResourceProps {
  /** Resource's data. */
  readonly data : CustomResource;
}


/**
 * Stumpfi custom resource (script, link, style).
 * @param {ResourceProps} props Resource props.
 * @returns {JSX.Element} The resource's React element.
 */
export default function Resource(props : ResourceProps) : JSX.Element {
  const data : CustomResource = props.data;
  const innerHTML : { __html : string; } | undefined = (data.content !== undefined)
    ? { __html: data.content as string }
    : undefined;

  switch (data.tagName) {
    case 'style':
      return <style {...data.attributes} dangerouslySetInnerHTML={innerHTML} />;
    case 'script':
      return <script {...data.attributes} dangerouslySetInnerHTML={innerHTML} />;
    default:
      return <link {...data.attributes} />;
  }
}
