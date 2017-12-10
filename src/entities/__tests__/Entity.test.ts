/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as crypto from 'crypto';
import Entity from '../Entity';


jest.mock('crypto');


/**
 * We need to declare a fake class to test Entity abstract class.
 */
class EntityChild extends Entity {
}


describe('Entity', () => {
  let entity : EntityChild;

  beforeEach(() => {
    entity = new EntityChild();
  });

  describe('constructor', () => {
    test('should always correctly instanciate', () => {
      expect(entity.getId()).toBe('a1bc2de3fg4hi5jk6lm7no8pq9rs0tu1vw2xy3z0');
    });
  });
});
