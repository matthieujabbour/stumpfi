/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Component from '../Component';
import Content from '../Content';
import Resource from '../Resource';


let instances : number = 0;


export default class Page extends jest.genMockFromModule('../Page').default {

  public setMaster : (master : Page) => void;
  public getMaster : () => Page | null;
  public addResource : (resource : Resource) => void;
  public removeResource : (index : number) => void;
  public getResources : (includeMaster? : boolean) => Resource[];
  public addComponent : (component : Component) => void;
  public removeComponent : (index : number) => void;
  public getComponents : (includeMaster? : boolean) => Component[];
  public getText : (includeMaster? : boolean) => Page;
  public duplicate : () => Page;


  public constructor() {
    super();
    const i : number = instances++;
    this.setMaster = jest.fn();
    this.getMaster = jest.fn(() => new Page());
    this.addResource = jest.fn();
    this.removeResource = jest.fn();
    this.getResources = jest.fn(() => [new Resource('script'), new Resource('script')]);
    this.addComponent = jest.fn();
    this.removeComponent = jest.fn();
    this.getComponents = jest.fn(() => [
      new Component(new Content()),
      new Component(new Content()),
    ]);
    this.getText = jest.fn(() => `test${i}`);
    this.duplicate = jest.fn(() => new Page());
  }
}
