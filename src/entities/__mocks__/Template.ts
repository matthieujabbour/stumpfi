/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Resource from './Resource';


let instances : number = 0;


interface Template {
  getId() : string;
  getResources() : Resource[];
  addResource(resource : Resource) : void;
  removeResource(resource : Resource) : void;
  getCode() : string;
  setCode() : void;
}


class Template {
  protected id : string;
  protected resources : Resource[];
  private code : string;


  public constructor() {
    const i : string = `${(instances++)}`;
    this.id = `${'a1bc2de3fg4hi5jk6lm7no8pq9rs0tu1vw2xy3z0'.substring(0, 40 - i.length)}${i}`;
    this.resources = [new Resource(), new Resource()];
    this.code = `<p>test${i}<a>{MEDIA}</a></p>`;
  }


  public getId() : string {
    return this.id;
  }


  public getResources() : Resource[] {
    return this.resources;
  }


  public getCode() : string {
    return this.code;
  }
}


Template.prototype.getId = jest.fn(Template.prototype.getId);
Template.prototype.getResources = jest.fn(Template.prototype.getResources);
Template.prototype.getCode = jest.fn(Template.prototype.getCode);
Template.prototype.addResource = jest.fn();
Template.prototype.removeResource = jest.fn();
Template.prototype.setCode = jest.fn();


export default Template;
