/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { Coordinates, Dimensions } from '../../types';
import Content from './Content';
import Template from './Template';


let instances : number = 0;


interface Component {
  getId() : string;
  getContents() : (Content | null)[];
  setContentAt(index : number, content : Content) : void;
  getCoordinates() : Coordinates;
  setCoordinates(coordinates : Coordinates) : void;
  getDimensions() : Dimensions;
  setDimensions(dimensions : Dimensions) : void;
  getTemplate() : Template;
  setTemplate(template : Template) : void;
  getText() : string;
  duplicate() : Component;
}


class Component {
  private id : string;
  private text : string;


  public constructor() {
    const i : string = `${(instances++)}`;
    this.id = `${'a1bc2de3fg4hi5jk6lm7no8pq9rs0tu1vw2xy3z0'.substring(0, 40 - i.length)}${i}`;
    this.text = `text${i}`;
  }


  public getId() : string {
    return this.id;
  }


  public getText() : string {
    return this.text;
  }
}


Component.prototype.getId = jest.fn(Component.prototype.getId);
Component.prototype.getText = jest.fn(Component.prototype.getText);
Component.prototype.getContents = jest.fn(() => [null, new Content(), null, new Content()]);
Component.prototype.setContentAt = jest.fn();
Component.prototype.getCoordinates = jest.fn(() => ({ x: 20, y: 40 }));
Component.prototype.setCoordinates = jest.fn();
Component.prototype.getDimensions = jest.fn(() => ({ w: 20, h: 40 }));
Component.prototype.setDimensions = jest.fn();
Component.prototype.getTemplate = jest.fn(() => new Template());
Component.prototype.setTemplate = jest.fn();
Component.prototype.duplicate = jest.fn(() => new Component());


export default Component;
