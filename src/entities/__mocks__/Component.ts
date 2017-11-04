/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Content from '../Content';


interface CssProperties {
  [x : string] : string;
}


let instances : number = 0;


export default class Component extends jest.genMockFromModule('../Component').default {

  public getContent : () => Content;
  public setContent : (content : Content) => void;
  public getClassName : () => string;
  public setClassName : (className : string) => void;
  public getStyle : () => CssProperties;
  public setStyle : (style : CssProperties) => void;
  public getText : () => string;
  public duplicate : () => Component;


  public constructor() {
    super();
    const i : number = instances++;
    this.getContent = jest.fn(() => new Content());
    this.setContent = jest.fn();
    this.getClassName = jest.fn(() => `className${i}`);
    this.setClassName = jest.fn();
    this.getStyle = jest.fn(() => ({ width: '50px' }));
    this.setStyle = jest.fn();
    this.getText = jest.fn(() => `text${i}`);
    this.duplicate = jest.fn(() => new Component());
  }
}
