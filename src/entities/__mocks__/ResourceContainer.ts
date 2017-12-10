/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/* tslint:disable no-invalid-this */


import Entity from './Entity';
import Resource from './Resource';


export default class ResourceContainer extends Entity {

  public addResource : (resource : Resource) => void;
  public removeResource : (resource : Resource) => void;
  public getResources : () => Resource[];
  protected resources : Resource[];


  public constructor() {
    super();
    this.resources = [new Resource(), new Resource()];
  }

}

ResourceContainer.prototype.addResource = jest.fn();
ResourceContainer.prototype.removeResource = jest.fn();
ResourceContainer.prototype.getResources = jest.fn(function () : Resource[] {
  return this.resources;
});
