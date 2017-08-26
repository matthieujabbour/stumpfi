/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Section from './Section';
import Theme from './Theme';


/**
 * Represents a document page.
 */
export default class Page extends Section {

  /** Page's theme. */
  private theme : Theme | null;


  /**
   * Class constructor.
   * @returns {void}
   */
  public constructor() {
    super();
    this.theme = null;
  }


  /**
   * theme setter
   * @param {Theme} theme New theme to set to the page.
   * @returns {void}
   */
  public setTheme(theme : Theme) : void {
    this.theme = theme;
  }


  /**
   * theme getter
   * @returns {Theme | null} The page's theme.
   */
  public getTheme() : Theme | null {
    return this.theme;
  }


  /**
   * Retrieves all the text contained in the page.
   * @returns {string} The page's text.
   */
  public getText() : string {
    return `${super.getText()} ${(this.theme !== null) ? this.theme.getText() : ''}`.trim();
  }

}
