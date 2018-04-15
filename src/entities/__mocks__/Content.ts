/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


let instances : number = 0;


interface Content {
  getId() : string;
  getMarkupText() : string;
  setMarkupText() : void;
  getText() : string;
  duplicate() : Content;
}


class Content {
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


  public getMarkupText() : string {
    return this.text;
  }
}


Content.prototype.getId = jest.fn(Content.prototype.getId);
Content.prototype.getText = jest.fn(Content.prototype.getText);
Content.prototype.getMarkupText = jest.fn(Content.prototype.getMarkupText);
Content.prototype.setMarkupText = jest.fn();
Content.prototype.duplicate = jest.fn(() => new Content());


export default Content;
