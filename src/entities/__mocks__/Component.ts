/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/* tslint:disable no-invalid-this */


import { Coordinates, Dimensions } from '../../types';
import Content from './Content';
import Entity from './Entity';
import Template from './Template';


let instances : number = 0;


export default class Component extends Entity {

  public getContents : () => (Content | null)[];
  public setContentAt : (index : number, content : Content) => void;
  public getCoordinates : () => Coordinates;
  public setCoordinates : (coordinates : Coordinates) => void;
  public getDimensions : () => Dimensions;
  public setDimensions : (dimensions : Dimensions) => void;
  public getTemplate : () => Template;
  public setTemplate : (template : Template) => void;
  public getText : () => string;
  public duplicate : () => Component;
  private text : string;


  public constructor() {
    super();
    this.text = `text${instances++}`;
  }

}

Component.prototype.setContentAt = jest.fn();
Component.prototype.setCoordinates = jest.fn();
Component.prototype.setDimensions = jest.fn();
Component.prototype.setTemplate = jest.fn();
Component.prototype.duplicate = jest.fn(() => new Component());
Component.prototype.getTemplate = jest.fn(() => new Template());
Component.prototype.getDimensions = jest.fn(() => ({ w: 20, h: 40 }));
Component.prototype.getCoordinates = jest.fn(() => ({ x: 20, y: 40 }));
Component.prototype.getContents = jest.fn(() => [null, new Content(), null, new Content()]);
Component.prototype.getText = jest.fn(function () : string { return this.text; });
