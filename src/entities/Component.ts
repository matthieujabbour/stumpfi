/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Content from './Content';
import Entity from './Entity';


/**
 * Represents a section component.
 */
export default class Component extends Entity {

  /** Component's content. */
  private content : Content;

  /** Component's CSS style. */
  private style : CssProperties;


  /**
   * Class constructor.
   * @param {Content} content Component's content.
   * @returns {void}
   */
  public constructor(content : Content) {
    super();
    this.content = content;
    this.style = {};
  }


  /**
   * content getter.
   * @returns {Content} The component's content.
   */
  public getContent() : Content {
    return this.content;
  }


  /**
   * content setter.
   * @param {Content} content Content to set to the component.
   * @returns {void}
   */
  public setContent(content : Content) : void {
    this.content = content;
  }


  /**
   * style getter.
   * @returns {CssProperties} The component's style.
   */
  public getStyle() : CssProperties {
    return this.style;
  }


  /**
   * style setter.
   * @param {CssProperties} style CSS style to set to the component.
   * @returns {void}
   */
  public setStyle(style : CssProperties) : void {
    this.style = style;
  }


  /**
   * Retrieves all the text contained in the component.
   * @returns {string} The component's text.
   */
  public getText() : string {
    return this.content.getText();
  }

}
