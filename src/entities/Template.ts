/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import ResourceContainer from './ResourceContainer';


/**
 * Represents a component's template.
 */
export default class Template extends ResourceContainer {

  /** Template's HTML code. */
  private code : string;


  /**
   * Class constructor.
   * @param {string} code Template's HTML code.
   * @returns {void}
   */
  public constructor(code : string) {
    super();
    this.code = code;
  }


  /**
   * code getter.
   * @returns {string} The template's HTML code.
   */
  public getCode() : string {
    return this.code;
  }


  /**
   * code setter.
   * @param {string} code HTML code to set to the template.
   * @returns {void}
   */
  public setCode(code : string) : void {
    this.code = code;
    this.updateTimestamp();
  }

}
