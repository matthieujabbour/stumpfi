/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Component from './Component';
import Entity from './Entity';


/** Custom resource type definition. */
type resourceTag = 'style' | 'script' | 'link';
interface CustomResource {
  readonly tagName : resourceTag;
  readonly content? : string;
  readonly attributes : {
    readonly async? : boolean;
    readonly charSet? : string;
    readonly crossOrigin? : string;
    readonly defer? : boolean;
    readonly integrity? : string;
    readonly nonce? : string;
    readonly src? : string;
    readonly type? : string;
    readonly media? : string;
    readonly scoped? : boolean;
    readonly href? : string;
    readonly hrefLang? : string;
    readonly rel? : string;
    readonly sizes? : string;
    readonly 'data-default'? : boolean;
    'data-page-id'? : string;
  };
}


/**
 * Represents a document page.
 */
export default class Page extends Entity {

  /** Page master. */
  private master : Page | null;

  /** Page's resources. */
  private resources : CustomResource[];

  /** Page's components list. */
  private components : Component[];


  /**
   * Class constructor.
   * @returns {void}
   */
  public constructor() {
    super();
    this.master = null;
    this.resources = [];
    this.components = [];
  }


  /**
   * master setter.
   * @param {Page} master Master to set to the page.
   * @returns {void}
   */
  public setMaster(master : Page) : void {
    this.master = master;
  }


  /**
   * master getter.
   * @returns {Page | null} The page master.
   */
  public getMaster() : Page | null {
    return this.master;
  }


  /**
   * Adds a new custom resource to the page.
   * @param {CustomResource} resource Resource to add to the page.
   * @returns {void}
   */
  public addResource(resource : CustomResource) : void {
    resource.attributes['data-page-id'] = this.getId();
    if (!this.resources.includes(resource)) this.resources.push(resource);
  }


  /**
   * Removes a custom resource from the page.
   * @param {number} index Index of the resource to remove from the page.
   * @returns {void}
   */
  public removeResource(index : number) : void {
    if (index > -1) this.resources.splice(index, 1);
  }


  /**
   * resources getter.
   * @param {boolean} [includeMaster] Whether to include page master's resources (default to true).
   * @returns {CustomResource[]} The page's resources.
   */
  public getResources(includeMaster : boolean = true) : CustomResource[] {
    return (includeMaster && this.master !== null)
      ? this.master.getResources().concat(this.resources)
      : this.resources;
  }


  /**
   * Adds a new component to the page if it doesn't already exist.
   * @param {Component} component Component to add to the page.
   * @returns {void}
   */
  public addComponent(component : Component) : void {
    if (!this.components.includes(component)) this.components.push(component);
  }


  /**
   * Removes a component from the page.
   * @param {number} index Index of the component to remove from the page.
   * @returns {void}
   */
  public removeComponent(index : number) : void {
    if (index > -1) this.components.splice(index, 1);
  }


  /**
   * components getter.
   * @param {boolean} [includeMaster] Whether to include page master's components (default to true).
   * @returns {Component[]} The page's components list.
   */
  public getComponents(includeMaster : boolean = true) : Component[] {
    return (includeMaster && this.master !== null)
      ? this.master.getComponents().concat(this.components)
      : this.components;
  }


  /**
   * Retrieves all the text contained in the page.
   * @param {boolean} [includeMaster] Whether to include page master's text (default to true).
   * @returns {string} The page's text.
   */
  public getText(includeMaster : boolean = true) : string {
    return (includeMaster && this.master !== null)
      ? `${this.master.getText()} ${this.components.map(component => component.getText()).join(' ')}`
      : this.components.map(component => component.getText()).join(' ');
  }


  /**
   * Deeply duplicates the page. Returns a new Page instance.
   * Caveat : page master is not duplicated.
   * @returns {Page} The duplicated page.
   */
  public duplicate() : Page {
    const duplicatedPage : Page = new Page();
    this.components.forEach((component) => { duplicatedPage.addComponent(component.duplicate()); });
    this.resources.forEach((r) => { duplicatedPage.addResource(JSON.parse(JSON.stringify(r))); });
    if (this.master !== null) { duplicatedPage.setMaster(this.master); }
    return duplicatedPage;
  }

}
