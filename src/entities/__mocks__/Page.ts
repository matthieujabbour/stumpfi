/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/* tslint:disable no-invalid-this */


import Component from './Component';
import Content from './Content';
import Resource from './Resource';
import ResourceContainer from './ResourceContainer';


let instances : number = 0;


export default class Page extends ResourceContainer {

  public setMaster : (master : Page) => void;
  public getMaster : () => Page | null;
  public addComponent : (component : Component) => void;
  public removeComponent : (index : number) => void;
  public getComponents : (includeMaster? : boolean) => Component[];
  public getText : (includeMaster? : boolean) => Page;
  public duplicate : () => Page;
  private text : string;


  public constructor() {
    super();
    this.text = `test${instances++}`;
  }

}

Page.prototype.setMaster = jest.fn();
Page.prototype.addComponent = jest.fn();
Page.prototype.removeComponent = jest.fn();
Page.prototype.getMaster = jest.fn(() => new Page());
Page.prototype.duplicate = jest.fn(() => new Page());
Page.prototype.getText = jest.fn(function () : string { return this.text; });
Page.prototype.getResources = jest.fn(() => [new Resource(), new Resource()]);
Page.prototype.getComponents = jest.fn(() => [new Component(), new Component()]);
