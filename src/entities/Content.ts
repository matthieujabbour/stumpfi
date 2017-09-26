/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as he from 'he';
import Entity from './Entity';


/**
 * Represents a component's content.
 */
export default class Content extends Entity {

  /** Content's HTML code. */
  private html : string;


  /**
   * Class constructor.
   * @param {string} [html] Content's HTML code.
   * @returns {void}
   */
  public constructor(html : string = '') {
    super();
    this.html = html;
  }


  /**
   * html getter.
   * @returns {string} The content's html code.
   */
  public getHtml() : string {
    return this.html;
  }


  /**
   * html setter.
   * @param {string} html HTML code to set to the content.
   * @returns {void}
   */
  public setHtml(html : string) : void {
    this.html = html;
  }


  /**
   * Retrieves all the text contained in the content.
   * @returns {string} The content's text.
   */
  public getText() : string {
    // We remove all the HTML tags and entities using the excellent `he` module.
    const stripedHtml : string = this.html.replace(/<[^>]+>/g, '');
    return he.decode(stripedHtml);
  }


  /**
   * Deeply duplicates the content. Returns a new Content instance.
   * @returns {Content} The duplicated content.
   */
  public duplicate() : Content {
    return new Content(this.html);
  }

}
