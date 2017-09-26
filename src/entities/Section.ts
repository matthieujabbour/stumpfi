/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Component from './Component';
import Entity from './Entity';


/**
 * Represents a collection of components.
 */
export default class Section extends Entity {

  /** Section's components list. */
  protected components : Component[];


  /**
   * Class constructor.
   * @returns {void}
   */
  public constructor() {
    super();
    this.components = [];
  }


  /**
   * components getter.
   * @returns {Component[]} The section's components list.
   */
  public getComponents() : Component[] {
    return this.components;
  }


  /**
   * Adds a new component to the section if it doesn't already exist.
   * @param {Component} component Component to add to the section.
   * @returns {void}
   */
  public addComponent(component : Component) : void {
    if (!this.components.includes(component)) this.components.push(component);
  }


  /**
   * Retrieves all the text contained in the section.
   * @returns {string} The section's text.
   */
  public getText() : string {
    return this.components.map(component => component.getText()).join(' ');
  }

}
