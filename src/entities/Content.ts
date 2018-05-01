/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { ContentTypes } from '../types';
import Entity from './Entity';


/**
 * Represents a component's content.
 */
export default class Content extends Entity {

  /** Content's type (media, rich text, simple text). */
  private type : ContentTypes;

  /** Content's markup text. */
  private markupText : string;


  /**
   * Class constructor.
   * @param {ContentTypes} type Content's type.
   * @param {string} [markupText] Content's markup text.
   * @returns {void}
   */
  public constructor(type : ContentTypes, markupText : string = '') {
    super();
    this.type = type;
    this.markupText = markupText;
  }


  /**
   * type getter.
   * @returns {ContentTypes} The content's type.
   */
  public getType() : ContentTypes {
    return this.type;
  }


  /**
   * type setter.
   * @param {ContentTypes} type Type to set to the content.
   * @returns {void}
   */
  public setType(type : ContentTypes) : void {
    this.type = type;
    this.updateTimestamp();
  }


  /**
   * markupText getter.
   * @returns {string} The content's markup text.
   */
  public getMarkupText() : string {
    return this.markupText;
  }


  /**
   * markupText setter.
   * @param {string} markupText Markup text to set to the content.
   * @returns {void}
   */
  public setMarkupText(markupText : string) : void {
    this.markupText = markupText;
    this.updateTimestamp();
  }


  /**
   * Retrieves all the raw text contained in the content.
   * @returns {string} The content's text.
   */
  public getText() : string {
    return this.markupText;
  }


  /**
   * Deeply duplicates the content. Returns a new Content instance.
   * @returns {Content} The duplicated content.
   */
  public duplicate() : Content {
    return new Content(this.type, this.markupText);
  }

}
