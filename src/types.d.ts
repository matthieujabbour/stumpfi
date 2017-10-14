/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/** CSS properties type definition. */
interface CssProperties {
  [x: string]: string;
}


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
 * Represents an abstract stumpfi entity.
 */
declare abstract class Entity {

  /** Entity's id. */
  private id : string;


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


declare namespace stumpfi {

  /**
   * Represents a component's content.
   */
  export class Content extends Entity {
  
    /** Content's HTML code. */
    private html : string;
  
  
    /**
     * Class constructor.
     * @param {string} [html] Content's HTML code.
     * @returns {void}
     */
    public constructor(html? : string);
  
  
    /**
     * html getter.
     * @returns {string} The content's html code.
     */
    public getHtml() : string;
  
  
    /**
     * html setter.
     * @param {string} html HTML code to set to the content.
     * @returns {void}
     */
    public setHtml(html : string) : void;
  
  
    /**
     * Retrieves all the text contained in the content.
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
   * Represents a page component.
   */
  export class Component extends Entity {
  
    /** Component's content. */
    private content : Content;
  
    /** Component's HTML class name. */
    private className : string;
  
    /** Component's CSS style. */
    private style : CssProperties;
  
  
    /**
     * Class constructor.
     * @param {Content} content Component's content.
     * @returns {void}
     */
    public constructor(content : Content);
  
  
    /**
     * content getter.
     * @returns {Content} The component's content.
     */
    public getContent() : Content;
  
  
    /**
     * content setter.
     * @param {Content} content Content to set to the component.
     * @returns {void}
     */
    public setContent(content : Content) : void;
  
  
    /**
     * className getter.
     * @returns {string} The component's HTML class name.
     */
    public getClassName() : string;
  
  
    /**
     * className setter.
     * @param {string} className Class name to set to the component.
     * @returns {void}
     */
    public setClassName(className : string) : void;
  
  
    /**
     * style getter.
     * @returns {CssProperties} The component's style.
     */
    public getStyle() : CssProperties;
  
  
    /**
     * style setter.
     * @param {CssProperties} style CSS style to set to the component.
     * @returns {void}
     */
    public setStyle(style : CssProperties) : void;
  
  
    /**
     * Retrieves all the text contained in the component.
     * @returns {string} The component's text.
     */
    public getText() : string;
  
  
    /**
     * Deeply duplicates the component. Returns a new Component instance.
     * Caveat : The component's content is not duplicated.
     * @returns {Component} The duplicated component.
     */
    public duplicate() : Component;
  
  }


  /**
   * Represents a document page.
   */
  export class Page extends Entity {
  
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
    public constructor();
  
  
    /**
     * master setter.
     * @param {Page} master Master to set to the page.
     * @returns {void}
     */
    public setMaster(master : Page) : void;
  
  
    /**
     * master getter.
     * @returns {Page | null} The page master.
     */
    public getMaster() : Page | null;
  
  
    /**
     * Adds a new custom resource to the page.
     * @param {CustomResource} resource Resource to add to the page.
     * @returns {void}
     */
    public addResource(resource : CustomResource) : void;
  
  
    /**
     * Removes a custom resource from the page.
     * @param {number} index Index of the resource to remove from the page.
     * @returns {void}
     */
    public removeResource(index : number) : void;
  
  
    /**
     * resources getter.
     * @param {boolean} [includeMaster] Whether to include page master's resources (default to true).
     * @returns {CustomResource[]} The page's resources.
     */
    public getResources(includeMaster? : boolean) : CustomResource[];
  
  
    /**
     * Adds a new component to the page if it doesn't already exist.
     * @param {Component} component Component to add to the page.
     * @returns {void}
     */
    public addComponent(component : Component) : void;
  
  
    /**
     * Removes a component from the page.
     * @param {number} index Index of the component to remove from the page.
     * @returns {void}
     */
    public removeComponent(index : number) : void;
  
  
    /**
     * components getter.
     * @param {boolean} [includeMaster] Whether to include page master's components (default to true).
     * @returns {Component[]} The page's components list.
     */
    public getComponents(includeMaster? : boolean) : Component[];
  
  
    /**
     * Retrieves all the text contained in the page.
     * @param {boolean} [includeMaster] Whether to include page master's text (default to true).
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
  export class Document extends Entity {
  
    /** Document's name. */
    private name : string;
  
    /** Document's description. */
    private description : string;
  
    /** Document's tags. */
    private tags : string[];
  
    /** Document's authors. */
    private authors : string[];
  
    /** Document's custom resources. */
    private resources : CustomResource[];
  
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
     * @param {string} [name] Document's name.
     * @param {string} [description] Document's description.
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
     * Adds a new custom resource to the document.
     * @param {CustomResource} resource Resource to add to the document.
     * @returns {void}
     */
    public addResource(resource : CustomResource) : void;
  
  
    /**
     * Removes a custom resource from the document.
     * @param {CustomResource} resource Resource to remove from the document.
     * @returns {void}
     */
    public removeResource(resource : CustomResource) : void;
  
  
    /**
     * resources getter.
     * @returns {CustomResource[]} The document's custom resources.
     */
    public getResources() : CustomResource[];
  
  
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

}


export default stumpfi;
