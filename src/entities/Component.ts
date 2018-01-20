/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { Coordinates, Dimensions } from '../types';
import Content from './Content';
import Entity from './Entity';
import Template from './Template';


/**
 * Represents a page component.
 */
export default class Component extends Entity {

  /** Component's contents list. */
  private contents : (Content | null)[];

  /** Component's coordinates on the page. */
  private coordinates : Coordinates;

  /** Component's dimensions. */
  private dimensions : Dimensions;

  /** Component's template. */
  private template : Template;


  /**
   * Class constructor.
   * @param {Template} [template] Template to apply to contents.
   * @param {Dimensions} [dimensions] Component's dimensions.
   * @param {Coordinates} [coordinates] Component's coordinates.
   * @returns {void}
   */
  public constructor(template? : Template, dimensions? : Dimensions, coordinates? : Coordinates) {
    super();
    this.contents = [];
    this.dimensions = dimensions || { w: 0, h: 0 };
    this.coordinates = coordinates || { x: 0, y: 0 };
    this.template = template || new Template('{{RICH_TEXT}}');
  }


  /**
   * contents getter.
   * @returns {(Content | null)[]} The component's contents list.
   */
  public getContents() : (Content | null)[] {
    return this.contents;
  }


  /**
   * Sets a content at the given index in the component's contents list.
   * @param {number} index Index of the content in the list.
   * @param {Content} content Content to set at the given indice in the list.
   * @returns {void}
   */
  public setContentAt(index : number, content : Content) : void {
    for (let i : number = 0; i < index; ++i) {
      this.contents[i] = this.contents[i] || null;
    }
    this.contents[index] = content;
  }


  /**
   * coordinates getter.
   * @returns {Coordinates} The component's coordinates.
   */
  public getCoordinates() : Coordinates {
    return this.coordinates;
  }


  /**
   * coordinates setter.
   * @param {string} coordinates Coordinates to set to the component.
   * @returns {void}
   */
  public setCoordinates(coordinates : Coordinates) : void {
    this.coordinates = coordinates;
  }


  /**
   * dimensions getter.
   * @returns {Dimensions} The component's dimensions.
   */
  public getDimensions() : Dimensions {
    return this.dimensions;
  }


  /**
   * dimensions setter.
   * @param {Dimensions} dimensions Dimensions to set to the component.
   * @returns {void}
   */
  public setDimensions(dimensions : Dimensions) : void {
    this.dimensions = dimensions;
  }


  /**
   * template getter.
   * @returns {Template} The component's template.
   */
  public getTemplate() : Template {
    return this.template;
  }


  /**
   * template setter.
   * @param {Template} template Template to set to the component.
   * @returns {void}
   */
  public setTemplate(template : Template) : void {
    this.template = template;
  }


  /**
   * Retrieves all the text contained in the component.
   * @returns {string} The component's text.
   */
  public getText() : string {
    const contents : Content[] = this.contents.filter(content => content !== null) as Content[];
    return contents.map(content => (content as Content).getText()).join(' ');
  }


  /**
   * Deeply duplicates the component. Returns a new Component instance.
   * Caveat : The component's contents and template are not duplicated.
   * @returns {Component} The duplicated component.
   */
  public duplicate() : Component {
    const duplicatedComponent : Component = new Component();
    duplicatedComponent.setCoordinates({ ...this.coordinates });
    duplicatedComponent.setDimensions({ ...this.dimensions });
    duplicatedComponent.setTemplate(this.template);
    this.contents.forEach((content, index) => {
      if (content !== null) {
        duplicatedComponent.setContentAt(index, content);
      }
    });
    return duplicatedComponent;
  }

}
