/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/* tslint:disable no-invalid-this */


import ResourceContainer from './ResourceContainer';


let instances : number = 0;


export default class Template extends ResourceContainer {

  public getCode : () => string;
  public setCode : () => void;
  private code : string;


  public constructor() {
    super();
    this.code = `<p>test${instances++}<a>{MEDIA}</a></p>`;
  }

}

Template.prototype.setCode = jest.fn();
Template.prototype.getCode = jest.fn(function () : string { return this.code; });
