/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/* tslint:disable no-invalid-this */


let instances : number = 0;


export default class Entity extends jest.genMockFromModule('../Entity').default {

  public getId : () => string;
  protected id : string;


  public constructor() {
    super();
    const i : string = `${(instances++)}`;
    this.id = `${'a1bc2de3fg4hi5jk6lm7no8pq9rs0tu1vw2xy3z0'.substring(0, 40 - i.length)}${i}`;
  }

}

Entity.prototype.getId = jest.fn(function () : string { return this.id; });
