/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


interface Attributes {
  [key : string] : string | boolean;
}


let instances : number = 0;


export default class Resource extends jest.genMockFromModule('../Resource').default {

  public getType : () => 'script' | 'style' | 'link';
  public getContent : () => string | null;
  public setContent : (content : string) => void;
  public getAttributes : () => Attributes;
  public setAttribute : (name : string, value : string | boolean) => Attributes;
  public duplicate : () => Resource;


  public constructor() {
    super();
    const i : number = instances++;
    this.getType = jest.fn(() => 'script');
    this.getContent = jest.fn(() => `content${i}`);
    this.setContent = jest.fn();
    this.getAttributes = jest.fn(() => ({ 'test-attribute': 'testValue' }));
    this.setAttribute = jest.fn();
    this.duplicate = jest.fn(() => new Resource());
  }
}
