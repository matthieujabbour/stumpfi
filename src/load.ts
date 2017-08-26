/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as fs from 'fs-extra';
import * as jsdom from 'jsdom';
import Component from './entities/Component';
import Content from './entities/Content';
import Document from './entities/Document';
import Page from './entities/Page';
import Theme from './entities/Theme';


// Converts any pure CSS property into camelCase.
const camelize : (key : string) => string = key => key.replace(/\-./g, m => m[1].toUpperCase());


/**
 * Convert a HTML `style` attribute's value into CssProperties format.
 * @param {string | null} styleString Style attribute's value to convert into CssProperties format.
 * @returns {CssProperties} The CssProperties-formated style.
 */
function convertStyle(styleString : string | null) : CssProperties {
  if (!styleString) return {};
  return styleString.split(';').filter(rule => (rule !== '')).reduce((style, rule) => {
    // This splitting regexp ensures that URLs are not taken in account.
    const parts : string[] = rule.split(/:(?!\/\/)/g).map(part => part.trim());
    return Object.assign(style, { [camelize(parts[0])]: parts[1] });
  }, {});
}


/**
 * Loads a document from the given file.
 * @param {string} filePath Path to the file from which to load the document.
 * @returns {Document} The loaded stumpfi document.
 */
export default function load(filePath : string) : Document {
  const document : Document = new Document();
  const dom : jsdom.JSDOM = new jsdom.JSDOM(fs.readFileSync(filePath, { encoding: 'utf8' }));
  const main : Element = dom.window.document.getElementsByTagName('main')[0];
  const head : HTMLHeadElement = dom.window.document.head;

  // Those lists are used to uniquely store each entity, to avoid creation of duplicates.
  const contents : { [key : string] : Content; } = {};
  const pages : { [key : string] : Page; } = {};
  const themes : { [key : string] : Theme; } = {};
  const components : { [key : string] : Component; } = {};

  // Setting document's name...
  document.setName(head.getElementsByTagName('title')[0].textContent as string);

  // Adding document's custom resources - links...
  const htmlLinks : NodeListOf<HTMLLinkElement> = head.getElementsByTagName('link');
  Object.keys(htmlLinks).forEach((link) => {
    const attributes : NamedNodeMap = htmlLinks[parseInt(link, 10)].attributes;
    document.addResource({
      tagName: 'link',
      attributes: Object.keys(attributes).reduce((props, key) => {
        const index : number = parseInt(key, 10);
        return Object.assign(props, { [attributes[index].name]: attributes[index].value });
      }, {}),
    });
  });

  // Adding document's custom resources - scripts...
  const htmlScripts : NodeListOf<HTMLScriptElement> = head.getElementsByTagName('script');
  Object.keys(htmlScripts).forEach((script) => {
    const attributes : NamedNodeMap = htmlScripts[parseInt(script, 10)].attributes;
    document.addResource({
      tagName: 'script',
      content: htmlScripts[parseInt(script, 10)].innerHTML,
      attributes: Object.keys(attributes).reduce((props, key) => {
        const index : number = parseInt(key, 10);
        return Object.assign(props, { [attributes[index].name]: attributes[index].value });
      }, {}),
    });
  });

  // Adding document's custom resources - styles...
  const htmlStyles : NodeListOf<HTMLStyleElement> = head.getElementsByTagName('style');
  Object.keys(htmlStyles).forEach((style) => {
    const attributes : NamedNodeMap = htmlStyles[parseInt(style, 10)].attributes;
    document.addResource({
      tagName: 'style',
      content: htmlStyles[parseInt(style, 10)].innerHTML,
      attributes: Object.keys(attributes).reduce((props, key) => {
        const index : number = parseInt(key, 10);
        return Object.assign(props, { [attributes[index].name]: attributes[index].value });
      }, {}),
    });
  });

  // Adding document's metadata...
  const htmlMetas : NodeListOf<HTMLMetaElement> = head.getElementsByTagName('meta');
  Object.keys(htmlMetas).forEach((key) => {
    const index : number = parseInt(key, 10);
    switch (htmlMetas[index].name) {
      case 'description':
        document.setDescription(htmlMetas[index].content);
        break;
      case 'keywords':
        htmlMetas[index].content.split(' ').forEach(content => document.addTag(content));
        break;
      case 'author':
        htmlMetas[index].content.split(', ').forEach(content => document.addAuthor(content));
        break;
      default:
        break;
    }
  });

  // Building document's tree...
  main.childNodes.forEach((htmlPage : Element) => {
    const pageId : string = htmlPage.getAttribute('data-page-id') as string;
    let themeId : string = '';

    // The page has not been encountered yet - we create it and store it...
    if (pages[pageId] === undefined) {
      pages[pageId] = new Page();

      if (htmlPage.getAttribute('data-theme-id') !== null) {
        themeId = htmlPage.getAttribute('data-theme-id') as string;

        // The theme has not been encountered yet - we create it and store it...
        if (themes[themeId] === undefined) {
          themes[themeId] = new Theme();
        }

        pages[pageId].setTheme(themes[themeId]);
      }

      htmlPage.childNodes.forEach((htmlComponent : Element) => {
        const componentId : string = htmlComponent.getAttribute('data-component-id') as string;

        // The component has not been encountered yet - we create it and store it...
        if (components[componentId] === undefined) {
          const contentId : string = htmlComponent.getAttribute('data-content-id') as string;

          if (contents[contentId] === undefined) {
            contents[contentId] = new Content(htmlComponent.innerHTML);
          }

          components[componentId] = new Component(contents[contentId]);
          components[componentId].setStyle(convertStyle(htmlComponent.getAttribute('style')));

          // The component belongs to the page...
          if (htmlComponent.getAttribute('data-theme') === 'false') {
            pages[pageId].addComponent(components[componentId]);
          // The component belongs to the page's theme...
          } else {
            themes[themeId].addComponent(components[componentId]);
          }
        }
      });
    }

    document.addPage(pages[pageId]);
  });

  return document;
}
