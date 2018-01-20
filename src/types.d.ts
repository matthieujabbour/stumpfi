/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/** Content's types list declaration. */
export const enum ContentTypes {
  MEDIA = 'MEDIA',
  RICH_TEXT = 'RICH_TEXT',
  SIMPLE_TEXT = 'SIMPLE_TEXT',
}


/** Resource attributes list type declaration. */
export interface Attributes {
  [key : string] : string | boolean;
}


/** Component's coordinates type definition. */
export interface Coordinates {
  x : number;
  y : number;
}


/** Component's dimensions type definition. */
export interface Dimensions {
  w : number;
  h : number;
}


/**
 * Represents an abstract stumpfi entity.
 */
declare abstract class Entity {

  /** Entity's id. */
  protected id : string;


  /**
   * Class constructor.
   * @returns {void}
   */
  public constructor();


  /**
   * id getter.
   * @returns {string} The entity's id.
   */
  public getId() : string;

}


/**
 * Represents a container of Resource instances.
 */
declare abstract class ResourceContainer extends Entity {

  /** Container's external resources list. */
  protected resources : Resource[];


  /**
   * Class constructor.
   * @returns {void}
   */
  public constructor();

  /**
   * Adds a new external resource to the container.
   * @param {Resource} resource Resource to add to the container.
   * @returns {void}
   */
  public addResource(resource : Resource) : void;

  /**
   * Removes an external resource from the container if exists.
   * @param {Resource} resource Resource to remove from the container.
   * @returns {void}
   */
  public removeResource(resource : Resource) : void;


  /**
   * resources getter.
   * @returns {Resource[]} The page's resources.
   */
  public getResources() : Resource[];

}


/**
 * Represents an external resource.
 */
export class Resource extends Entity {

  /** Resource HTML type (script, style, link). */
  private type : 'script' | 'style' | 'link';

  /** Resource content. */
  private content : string | null;

  /** Resource HTML attributes, depend on its type. */
  private attributes : Attributes;


  /**
   * Class constructor.
   * @param {\'script\' | \'style\' | \'link\'} type Resource HTML type (script, style, link).
   * @returns {void}
   */
  public constructor(type : 'script' | 'style' | 'link');


  /**
   * type getter.
   * @returns {\'script\' | \'style\' | \'link\'} The resource HTML type.
   */
  public getType() : 'script' | 'style' | 'link';


  /**
   * content getter.
   * @returns {string} The resource content.
   */
  public getContent() : string | null;


  /**
   * content setter.
   * @param {string} content New content to set to the resource.
   * @returns {void}.
   */
  public setContent(content : string) : void;


  /**
   * attributes getter.
   * @returns {Attributes} The resource attributes.
   */
  public getAttributes() : Attributes;


  /**
   * Sets an HTML attribute to the resource.
   * @param {string} name Attribute name.
   * @param {string | boolean} value Attribute value.
   * @returns {void}.
   */
  public setAttribute(name : string, value : string | boolean) : void;


  /**
   * Deeply duplicates the resource. Returns a new Resource instance.
   * @returns {Resource} The duplicated resource.
   */
  public duplicate() : Resource;

}


/**
 * Represents a component's content.
 */
export class Content extends Entity {

  /** Content's type (media, rich text, simple text). */
  private type : ContentTypes;

  /** Content's markup text. */
  private markupText : string;


  /**
   * Class constructor.
   * @param {ContentTypes} type Content's type.
   * @param {string} [markupText = ''] Content's markup text.
   * @returns {void}
   */
  public constructor(type : ContentTypes, markupText? : string);


  /**
   * type getter.
   * @returns {ContentTypes} The content's type.
   */
  public getType() : ContentTypes;


  /**
   * type setter.
   * @param {ContentTypes} type Type to set to the content.
   * @returns {void}
   */
  public setType(type : ContentTypes) : void;


  /**
   * markupText getter.
   * @returns {string} The content's markup text.
   */
  public getMarkupText() : string;


  /**
   * markupText setter.
   * @param {string} markupText Markup text to set to the content.
   * @returns {void}
   */
  public setMarkupText(markupText : string) : void;


  /**
   * Retrieves all the raw text contained in the content.
   * @returns {string} The content's text.
   */
  public getText() : string;


  /**
   * Deeply duplicates the content. Returns a new Content instance.
   * @returns {Content} The duplicated content.
   */
  public duplicate() : Content;

}


/**
 * Represents a component's template.
 */
export class Template extends ResourceContainer {

  /** Template's HTML code. */
  private code : string;


  /**
   * Class constructor.
   * @param {string} code Template's HTML code.
   * @returns {void}
   */
  public constructor(code : string);


  /**
   * code getter.
   * @returns {string} The template's HTML code.
   */
  public getCode() : string;


  /**
   * code setter.
   * @param {string} code HTML code to set to the template.
   * @returns {void}
   */
  public setCode(code : string) : void;

}


/**
 * Represents a page component.
 */
export class Component extends Entity {

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
  public constructor(template? : Template, dimensions? : Dimensions, coordinates? : Coordinates);


  /**
   * contents getter.
   * @returns {(Content | null)[]} The component's contents list.
   */
  public getContents() : (Content | null)[];


  /**
   * Sets a content at the given index in the component's contents list.
   * @param {number} index Index of the content in the list.
   * @param {Content} content Content to set at the given indice in the list.
   * @returns {void}
   */
  public setContentAt(index : number, content : Content) : void;


  /**
   * coordinates getter.
   * @returns {Coordinates} The component's coordinates.
   */
  public getCoordinates() : Coordinates;


  /**
   * coordinates setter.
   * @param {string} coordinates Coordinates to set to the component.
   * @returns {void}
   */
  public setCoordinates(coordinates : Coordinates) : void;


  /**
   * dimensions getter.
   * @returns {Dimensions} The component's dimensions.
   */
  public getDimensions() : Dimensions;


  /**
   * dimensions setter.
   * @param {Dimensions} dimensions Dimensions to set to the component.
   * @returns {void}
   */
  public setDimensions(dimensions : Dimensions) : void;


  /**
   * template getter.
   * @returns {Template} The component's template.
   */
  public getTemplate() : Template;


  /**
   * template setter.
   * @param {Template} template Template to set to the component.
   * @returns {void}
   */
  public setTemplate(template : Template) : void;


  /**
   * Retrieves all the text contained in the component.
   * @returns {string} The component's text.
   */
  public getText() : string;

  /**
   * Deeply duplicates the component. Returns a new Component instance.
   * Caveat : The component's contents and template are not duplicated.
   * @returns {Component} The duplicated component.
   */
  public duplicate() : Component;

}


/**
 * Represents a document page.
 */
export class Page extends ResourceContainer {

  /** Page master. */
  private master : Page | null;

  /** Page's components list. */
  private components : Component[];


  /**
   * Class constructor.
   * @param {Page} [master] Page master.
   * @returns {void}
   */
  public constructor(master? : Page);


  /**
   * master setter.
   * @param {Page} master Master to set to the page.
   * @throws {Error} Throws an error if setting this page master creates cyclic dependencies.
   * @returns {void}
   */
  public setMaster(master : Page) : void;


  /**
   * master getter.
   * @returns {Page | null} The page master.
   */
  public getMaster() : Page | null;


  /**
   * resources getter.
   * @param {boolean} [includeMaster = true] Whether to include page master's resources (default to true).
   * @returns {Resource[]} The page's resources.
   */
  public getResources(includeMaster? : boolean) : Resource[];


  /**
   * Adds a new component to the page if it doesn't already exist.
   * @param {Component} component Component to add to the page.
   * @returns {void}
   */
  public addComponent(component : Component) : void;


  /**
   * Removes a component from the page if exists.
   * @param {Component} component Component to remove from the page.
   * @returns {void}
   */
  public removeComponent(component : Component) : void;


  /**
   * components getter.
   * @param {boolean} [includeMaster = true] Whether to include page master's components (default to true).
   * @returns {Component[]} The page's components list.
   */
  public getComponents(includeMaster? : boolean) : Component[];


  /**
   * Retrieves all the text contained in the page.
   * @param {boolean} [includeMaster = true] Whether to include page master's text (default to true).
   * @returns {string} The page's text.
   */
  public getText(includeMaster? : boolean) : string;


  /**
   * Deeply duplicates the page. Returns a new Page instance.
   * Caveat : page master is not duplicated.
   * @returns {Page} The duplicated page.
   */
  public duplicate() : Page;

}



/**
 * Represents a document.
 */
export class Document extends ResourceContainer {

  /** Document's name. */
  private name : string;

  /** Document's description. */
  private description : string;

  /** Document's tags. */
  private tags : string[];

  /** Document's authors. */
  private authors : string[];

  /** Document's pages list. */
  private pages : Page[];


  /**
   * Checks if the given document's name is valid, throws an error otherwise.
   * @param {string} name Name to check.
   * @returns {void}
   */
  private static checkName(name : string) : void;


  /**
   * Class constructor.
   * @param {string} [name = 'new document'] Document's name.
   * @param {string} [description = ''] Document's description.
   * @returns {void}
   */
  public constructor(name? : string, description? : string);


  /**
   * name setter.
   * @param {string} name Name to set to the document.
   * @returns {void}
   */
  public setName(name : string) : void;


  /**
   * name getter.
   * @returns {string} The document's name.
   */
  public getName() : string;


  /**
   * description setter.
   * @param {string} description Description to set to the document.
   * @returns {void}
   */
  public setDescription(description : string) : void;


  /**
   * description getter.
   * @returns {string} The document's description.
   */
  public getDescription() : string;


  /**
   * Adds a new tag to the document.
   * @param {string} tag Tag to add to the document.
   * @returns {void}
   */
  public addTag(tag : string) : void;


  /**
   * Removes a tag from the document.
   * @param {string} tag Tag to remove from the document.
   * @returns {void}
   */
  public removeTag(tag : string) : void;


  /**
   * tags getter.
   * @returns {string[]} The document's tags.
   */
  public getTags() : string[];


  /**
   * Adds a new author to the document.
   * @param {string} author Author to add to the document.
   * @returns {void}
   */
  public addAuthor(author : string) : void;


  /**
   * Removes an author from the document.
   * @param {string} author Author to remove from the document.
   * @returns {void}
   */
  public removeAuthor(author : string) : void;


  /**
   * authors getter.
   * @returns {string[]} The document's authors.
   */
  public getAuthors() : string[];


  /**
   * pages getter.
   * @returns {Page[]} The document's pages list.
   */
  public getPages() : Page[];


  /**
   * Adds a new page to the document.
   * @param {Page} page Page to add to the document.
   * @returns {void}
   */
  public addPage(page : Page) : void;


  /**
   * Retrieves all the text contained in the document.
   * @returns {string} The document's text.
   */
  public getText() : string;

}
