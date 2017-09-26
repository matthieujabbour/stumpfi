/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Section from './Section';


/**
 * Represents a document theme.
 */
export default class Theme extends Section {

  /** Theme's custom resources. */
  private resources : CustomResource[];


  /**
   * Class constructor.
   * @returns {void}
   */
  public constructor() {
    super();
    this.resources = [];
  }


  /**
   * Adds a new custom resource to the theme.
   * @param {CustomResource} resource Resource to add to the theme.
   * @returns {void}
   */
  public addResource(resource : CustomResource) : void {
    if (!this.resources.includes(resource)) this.resources.push(resource);
  }


  /**
   * Removes a custom resource from the theme.
   * @param {CustomResource} resource Resource to remove from the theme.
   * @returns {void}
   */
  public removeResource(resource : CustomResource) : void {
    const index : number = this.resources.indexOf(resource);
    if (index > -1) this.resources.splice(index, 1);
  }


  /**
   * resources getter.
   * @returns {CustomResource[]} The theme's custom resources.
   */
  public getResources() : CustomResource[] {
    return this.resources;
  }

}
