/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Component from './entities/Component';
import Content from './entities/Content';
import Document from './entities/Document';
import HtmlComponent from './renderer/Component';
import HtmlDocument from './renderer/Document';
import HtmlPage from './renderer/Page';
import Page from './entities/Page';
import Theme from './entities/Theme';


export default {
  /** Contains all the stumpfi entities. */
  entities: { Document, Page, Component, Theme, Content },

  /** Contains all the rendering functions. */
  renderer: { Document: HtmlDocument, Page: HtmlPage, Component: HtmlComponent },
};
