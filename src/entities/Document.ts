/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Entity from './Entity';
import Page from './Page';
import Resource from './Resource';


/**
 * Represents a document.
 */
export default class Document extends Entity {

  /** Document's name. */
  private name : string;

  /** Document's description. */
  private description : string;

  /** Document's tags. */
  private tags : string[];

  /** Document's authors. */
  private authors : string[];

  /** Document's external resources. */
  private resources : Resource[];

  /** Document's pages list. */
  private pages : Page[];


  /**
   * Checks if the given document's name is valid, throws an error otherwise.
   * @param {string} name Name to check.
   * @returns {void}
   */
  private static checkName(name : string) : void {
    if (/[\/\\\?\:<>\*\"\|]/ig.test(name)) {
      throw new Error('Document\'s name cannot contain the following characters : /\\?:<>*"|');
    }
  }


  /**
   * Class constructor.
   * @param {string} [name] Document's name.
   * @param {string} [description] Document's description.
   * @returns {void}
   */
  public constructor(name : string = 'new document', description : string = '') {
    super();
    Document.checkName(name);
    this.name = name;
    this.description = description;
    this.tags = [];
    this.authors = [];
    this.pages = [];
    this.resources = [];
  }


  /**
   * name setter.
   * @param {string} name Name to set to the document.
   * @returns {void}
   */
  public setName(name : string) : void {
    Document.checkName(name);
    this.name = name;
  }


  /**
   * name getter.
   * @returns {string} The document's name.
   */
  public getName() : string {
    return this.name;
  }


  /**
   * description setter.
   * @param {string} description Description to set to the document.
   * @returns {void}
   */
  public setDescription(description : string) : void {
    this.description = description;
  }


  /**
   * description getter.
   * @returns {string} The document's description.
   */
  public getDescription() : string {
    return this.description;
  }


  /**
   * Adds a new tag to the document.
   * @param {string} tag Tag to add to the document.
   * @returns {void}
   */
  public addTag(tag : string) : void {
    if (!this.tags.includes(tag)) this.tags.push(tag);
  }


  /**
   * Removes a tag from the document.
   * @param {string} tag Tag to remove from the document.
   * @returns {void}
   */
  public removeTag(tag : string) : void {
    const index : number = this.tags.indexOf(tag);
    if (index > -1) this.tags.splice(index, 1);
  }


  /**
   * tags getter.
   * @returns {string[]} The document's tags.
   */
  public getTags() : string[] {
    return this.tags;
  }


  /**
   * Adds a new author to the document.
   * @param {string} author Author to add to the document.
   * @returns {void}
   */
  public addAuthor(author : string) : void {
    if (!this.authors.includes(author)) this.authors.push(author);
  }


  /**
   * Removes an author from the document.
   * @param {string} author Author to remove from the document.
   * @returns {void}
   */
  public removeAuthor(author : string) : void {
    const index : number = this.authors.indexOf(author);
    if (index > -1) this.authors.splice(index, 1);
  }


  /**
   * authors getter.
   * @returns {string[]} The document's authors.
   */
  public getAuthors() : string[] {
    return this.authors;
  }


  /**
   * Adds a new external resource to the document.
   * @param {CustomResource} resource Resource to add to the document.
   * @returns {void}
   */
  public addResource(resource : Resource) : void {
    if (!this.resources.includes(resource)) this.resources.push(resource);
  }


  /**
   * Removes a external resource from the document.
   * @param {CustomResource} resource Resource to remove from the document.
   * @returns {void}
   */
  public removeResource(resource : Resource) : void {
    const index : number = this.resources.indexOf(resource);
    if (index > -1) this.resources.splice(index, 1);
  }


  /**
   * resources getter.
   * @returns {CustomResource[]} The document's external resources.
   */
  public getResources() : Resource[] {
    return this.resources;
  }


  /**
   * pages getter.
   * @returns {Page[]} The document's pages list.
   */
  public getPages() : Page[] {
    return this.pages;
  }


  /**
   * Adds a new page to the document.
   * @param {Page} page Page to add to the document.
   * @returns {void}
   */
  public addPage(page : Page) : void {
    this.pages.push(page);
  }


  /**
   * Retrieves all the text contained in the document.
   * @returns {string} The document's text.
   */
  public getText() : string {
    let text : string = this.name;
    text = `${text} ${this.description}`;
    text = `${text} ${this.tags.join(' ')}`.trim();
    text = `${text} ${this.authors.join(' ')}`.trim();
    text = `${text} ${this.pages.map(page => page.getText()).join('\n\n')}`;
    return text;
  }

}
