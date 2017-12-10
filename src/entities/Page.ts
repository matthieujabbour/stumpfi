/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Component from './Component';
import Resource from './Resource';
import ResourceContainer from './ResourceContainer';


/**
 * Represents a document page.
 */
export default class Page extends ResourceContainer {

  /** Page master. */
  private master : Page | null;

  /** Page's components list. */
  private components : Component[];


  /**
   * Class constructor.
   * @returns {void}
   */
  public constructor() {
    super();
    this.master = null;
    this.components = [];
  }


  /**
   * master setter.
   * @param {Page} master Master to set to the page.
   * @throws {Error} Throws an error if setting this page master creates cyclic dependencies.
   * @returns {void}
   */
  public setMaster(master : Page) : void {
    // We first ensure that the current page instance is not contained in the masters tree
    // of `master` (which would lead to cyclic dependencies that would blow up page rendering).
    let currentMaster : Page | null = master;
    while (currentMaster !== null && currentMaster.getId() !== this.id) {
      currentMaster = currentMaster.getMaster();
    }
    if (currentMaster !== null) {
      throw new Error('Cyclic dependencies between page masters is not allowed.');
    }
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
   * resources getter.
   * @param {boolean} [includeMaster] Whether to include page master's resources (default to true).
   * @returns {Resource[]} The page's resources.
   */
  public getResources(includeMaster : boolean = true) : Resource[] {
    return (includeMaster && this.master !== null)
      ? this.master.getResources(includeMaster).concat(this.resources)
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
   * Removes a component from the page if exists.
   * @param {Component} component Component to remove from the page.
   * @returns {void}
   */
  public removeComponent(component : Component) : void {
    const index : number = this.components.indexOf(component);
    if (index > -1) this.components.splice(index, 1);
  }


  /**
   * components getter.
   * @param {boolean} [includeMaster] Whether to include page master's components (default to true).
   * @returns {Component[]} The page's components list.
   */
  public getComponents(includeMaster : boolean = true) : Component[] {
    return (includeMaster && this.master !== null)
      ? this.master.getComponents(includeMaster).concat(this.components)
      : this.components;
  }


  /**
   * Retrieves all the text contained in the page.
   * @param {boolean} [includeMaster] Whether to include page master's text (default to true).
   * @returns {string} The page's text.
   */
  public getText(includeMaster : boolean = true) : string {
    const componentsText : string = this.components.map(component => component.getText()).join(' ');
    return (includeMaster && this.master !== null)
      ? `${this.master.getText(includeMaster)} ${componentsText}`.trim()
      : componentsText.trim();
  }


  /**
   * Deeply duplicates the page. Returns a new Page instance.
   * Caveat : page master is not duplicated.
   * @returns {Page} The duplicated page.
   */
  public duplicate() : Page {
    const duplicatedPage : Page = new Page();
    this.components.forEach((component) => { duplicatedPage.addComponent(component.duplicate()); });
    this.resources.forEach((resource) => { duplicatedPage.addResource(resource.duplicate()); });
    if (this.master !== null) { duplicatedPage.setMaster(this.master); }
    return duplicatedPage;
  }

}
