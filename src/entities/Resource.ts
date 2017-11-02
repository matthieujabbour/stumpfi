/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Entity from './Entity';


/** Resource attributes list type declaration. */
interface Attributes {
  [key : string] : string | boolean;
}


/**
 * Represents an external resource.
 */
export default class Resource extends Entity {

  /** Resource HTML type (script, style, link). */
  private type : string;

  /** Resource content. */
  private content : string | null;

  /** Resource HTML attributes, depend on its type. */
  private attributes : Attributes;


  /**
   * Class constructor.
   * @param {string} type Resource HTML type (script, style, link).
   * @returns {void}
   */
  public constructor(type : string) {
    super();
    this.type = type;
    this.content = null;
    this.attributes = {};
  }


  /**
   * type getter.
   * @returns {string} The resource HTML type.
   */
  public getType() : string {
    return this.type;
  }


  /**
   * content getter.
   * @returns {string} The resource content.
   */
  public getContent() : string | null {
    return this.content;
  }


  /**
   * content setter.
   * @param {string} content New content to set to the resource.
   * @returns {void}.
   */
  public setContent(content : string) : void {
    this.content = content;
  }


  /**
   * attributes getter.
   * @returns {Attributes} The resource attributes.
   */
  public getAttributes() : Attributes {
    return this.attributes;
  }


  /**
   * Sets an HTML attribute to the resource.
   * @param {string} name Attribute name.
   * @param {string | boolean} value Attribute value.
   * @returns {void}.
   */
  public setAttribute(name : string, value : string | boolean) : void {
    this.attributes[name] = value;
  }


  /**
   * Deeply duplicates the resource. Returns a new Resource instance.
   * @returns {Resource} The duplicated resource.
   */
  public duplicate() : Resource {
    const duplicatedResource : Resource = new Resource(this.type);
    Object.keys(this.attributes).forEach((attribute) => {
      duplicatedResource.setAttribute(attribute, this.attributes[attribute]);
    });
    if (this.content !== null) {
      duplicatedResource.setContent(this.content);
    }
    return duplicatedResource;
  }

}
