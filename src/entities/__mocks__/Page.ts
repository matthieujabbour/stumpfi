/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Component from './Component';
import Resource from './Resource';


let instances : number = 0;


interface Page {
  getId() : string;
  getResources() : Resource[];
  addResource(resource : Resource) : void;
  removeResource(resource : Resource) : void;
  setMaster(master : Page) : void;
  getMaster() : Page | null;
  addComponent(component : Component) : void;
  removeComponent(index : number) : void;
  getComponents(includeMaster? : boolean) : Component[];
  getText(includeMaster? : boolean) : string;
  duplicate() : Page;
}


class Page {
  private id : string;
  private resources : Resource[];
  private text : string;


  public constructor() {
    const i : string = `${(instances++)}`;
    this.id = `${'a1bc2de3fg4hi5jk6lm7no8pq9rs0tu1vw2xy3z0'.substring(0, 40 - i.length)}${i}`;
    this.resources = [new Resource(), new Resource()];
    this.text = `text${i}`;
  }


  public getId() : string {
    return this.id;
  }


  public getResources() : Resource[] {
    return this.resources;
  }


  public getText(includeMaster : boolean = true) : string {
    return (includeMaster === true)
      ? `${this.text} master`
      : this.text;
  }
}


Page.prototype.getId = jest.fn(Page.prototype.getId);
Page.prototype.getResources = jest.fn(Page.prototype.getResources);
Page.prototype.getText = jest.fn(Page.prototype.getText);
Page.prototype.addResource = jest.fn();
Page.prototype.removeResource = jest.fn();
Page.prototype.setMaster = jest.fn();
Page.prototype.addComponent = jest.fn();
Page.prototype.removeComponent = jest.fn();
Page.prototype.getMaster = jest.fn(() => new Page());
Page.prototype.duplicate = jest.fn(() => new Page());
Page.prototype.getComponents = jest.fn(() => [new Component(), new Component()]);


export default Page;
