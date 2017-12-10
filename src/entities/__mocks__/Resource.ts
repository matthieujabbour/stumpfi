/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/* tslint:disable no-invalid-this */


import { Attributes } from '../../types';
import Entity from './Entity';


let instances : number = 0;


export default class Resource extends Entity {

  public getType : () => 'script' | 'style' | 'link';
  public getContent : () => string | null;
  public setContent : (content : string) => void;
  public getAttributes : () => Attributes;
  public setAttribute : (name : string, value : string | boolean) => Attributes;
  public duplicate : () => Resource;
  private content : string;


  public constructor() {
    super();
    this.content = `content${instances++}`;
  }

}

Resource.prototype.setContent = jest.fn();
Resource.prototype.setAttribute = jest.fn();
Resource.prototype.getType = jest.fn(() => 'script');
Resource.prototype.duplicate = jest.fn(() => new Resource());
Resource.prototype.getAttributes = jest.fn(() => ({ 'test-attribute': 'testValue' }));
Resource.prototype.getContent = jest.fn(function () : string { return `${this.content}`; });
