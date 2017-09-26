/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Content from './Content';
import Entity from './Entity';


/**
 * Represents a page component.
 */
export default class Component extends Entity {

  /** Component's content. */
  private content : Content;

  /** Component's HTML class name. */
  private className : string;

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
    this.className = '';
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
   * className getter.
   * @returns {string} The component's HTML class name.
   */
  public getClassName() : string {
    return this.className;
  }


  /**
   * className setter.
   * @param {string} className Class name to set to the component.
   * @returns {void}
   */
  public setClassName(className : string) : void {
    this.className = className;
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


  /**
   * Deeply duplicates the component. Returns a new Component instance.
   * Caveat : The component's content is not duplicated.
   * @returns {Component} The duplicated component.
   */
  public duplicate() : Component {
    const duplicatedComponent : Component = new Component(this.content);
    duplicatedComponent.setClassName(this.className);
    duplicatedComponent.setStyle(this.style);
    return duplicatedComponent;
  }

}
