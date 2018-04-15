/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Resource from './Resource';


let instances : number = 0;


interface ResourceContainer {
  getId() : string;
  getResources() : Resource[];
  addResource(resource : Resource) : void;
  removeResource(resource : Resource) : void;
}


class ResourceContainer {
  protected id : string;
  protected resources : Resource[];


  public constructor() {
    const i : string = `${(instances++)}`;
    this.id = `${'a1bc2de3fg4hi5jk6lm7no8pq9rs0tu1vw2xy3z0'.substring(0, 40 - i.length)}${i}`;
    this.resources = [new Resource(), new Resource()];
  }


  public getId() : string {
    return this.id;
  }


  public getResources() : Resource[] {
    return this.resources;
  }
}


ResourceContainer.prototype.getId = jest.fn(ResourceContainer.prototype.getId);
ResourceContainer.prototype.getResources = jest.fn(ResourceContainer.prototype.getResources);
ResourceContainer.prototype.addResource = jest.fn();
ResourceContainer.prototype.removeResource = jest.fn();


export default ResourceContainer;
