/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


let instances : number = 0;


export default class Content extends jest.genMockFromModule('../Content').default {

  public getHtml : () => string;
  public setHtml : () => void;
  public getText : () => string;
  public duplicate : () => Content;


  public constructor() {
    super();
    const i : number = instances++;
    this.getHtml = jest.fn(() => `<p>test${i}</p>`);
    this.setHtml = jest.fn();
    this.getText = jest.fn(() => `test${i}`);
    this.duplicate = jest.fn(() => new Content());
  }
}
