/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Entity from './Entity';
import Resource from './Resource';


/**
 * Represents a container of Resource instances.
 */
export default abstract class ResourceContainer extends Entity {

  /** Container's external resources list. */
  protected resources : Resource[];


  /**
   * Class constructor.
   * @returns {void}
   */
  public constructor() {
    super();
    this.resources = [];
  }


  /**
   * Adds a new external resource to the container.
   * @param {Resource} resource Resource to add to the container.
   * @returns {void}
   */
  public addResource(resource : Resource) : void {
    if (!this.resources.includes(resource)) this.resources.push(resource);
  }


  /**
   * Removes an external resource from the container if exists.
   * @param {Resource} resource Resource to remove from the container.
   * @returns {void}
   */
  public removeResource(resource : Resource) : void {
    const index : number = this.resources.indexOf(resource);
    if (index > -1) this.resources.splice(index, 1);
  }


  /**
   * resources getter.
   * @returns {Resource[]} The page's resources.
   */
  public getResources() : Resource[] {
    return this.resources;
  }

}
