/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/* tslint:disable no-invalid-this */


import Entity from './Entity';


let instances : number = 0;


export default class Content extends Entity {

  public getMarkupText : () => string;
  public setMarkupText : () => void;
  public getText : () => string;
  public duplicate : () => Content;
  private text : string;


  public constructor() {
    super();
    this.text = `test${instances++}`;
  }

}

Content.prototype.setMarkupText = jest.fn();
Content.prototype.duplicate = jest.fn(() => new Content());
Content.prototype.getText = jest.fn(function () : string { return `${this.text}`; });
Content.prototype.getMarkupText = jest.fn(function () : string { return `${this.text}`; });
