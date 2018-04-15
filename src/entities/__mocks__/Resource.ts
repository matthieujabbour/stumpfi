/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { Attributes } from '../../types';


let instances : number = 0;


interface Resource {
  getId() : string;
  getType() : 'script' | 'style' | 'link';
  getContent() : string | null;
  setContent(content : string) : void;
  getAttributes() : Attributes;
  setAttribute(name : string, value : string | boolean) : Attributes;
  duplicate() : Resource;
}


class Resource {
  private id : string;
  private content : string;


  public constructor() {
    const i : string = `${(instances++)}`;
    this.id = `${'a1bc2de3fg4hi5jk6lm7no8pq9rs0tu1vw2xy3z0'.substring(0, 40 - i.length)}${i}`;
    this.content = `content${i}`;
  }


  public getId() : string {
    return this.id;
  }


  public getContent() : string {
    return this.content;
  }
}


Resource.prototype.getId = jest.fn(Resource.prototype.getId);
Resource.prototype.getContent = jest.fn(Resource.prototype.getContent);
Resource.prototype.setContent = jest.fn();
Resource.prototype.setAttribute = jest.fn();
Resource.prototype.getType = jest.fn(() => 'script');
Resource.prototype.duplicate = jest.fn(() => new Resource());
Resource.prototype.getAttributes = jest.fn(() => ({ 'test-attribute': 'testValue' }));


export default Resource;
