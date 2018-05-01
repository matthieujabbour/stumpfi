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

  /** Entity's last modification timestamp. */
  protected timestamp : number;


  /**
   * Class constructor.
   * @returns {void}
   */
  public constructor() {
    this.id = crypto.randomBytes(20).toString('hex');
    this.timestamp = Date.now();
  }


  /**
   * id setter.
   * @param {string} id New id to set to the entity.
   * @throws {Error} Throws an error if the id is not in a valid format.
   * @returns {void}
   */
  public setId(id : string) : void {
    if (!/^[a-z0-9]{40}$/.test(id)) {
      throw new Error('Invalid id format.');
    }
    this.id = id;
  }


  /**
   * id getter.
   * @returns {string} The entity's id.
   */
  public getId() : string {
    return this.id;
  }


  /**
   * timestamp getter.
   * @returns {number} The entity's last modification timestamp.
   */
  public getTimestamp() : number {
    return this.timestamp;
  }


  /**
   * Updates the last modification timestamp.
   * @returns {void}
   */
  protected updateTimestamp() : void {
    this.timestamp = Date.now();
  }

}
