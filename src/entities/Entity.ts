/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as crypto from 'crypto';


/**
 * Represents an abstract stumpfi entity.
 */
export default abstract class Entity {

  /** Entity's id. */
  protected id : string;


  /**
   * Class constructor.
   * @returns {void}
   */
  public constructor() {
    this.id = crypto.randomBytes(20).toString('hex');
  }


  /**
   * id getter.
   * @returns {string} The entity's id.
   */
  public getId() : string {
    return this.id;
  }

}
