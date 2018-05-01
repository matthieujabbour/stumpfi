/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


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

  describe('setId', () => {
    test('should throw an error when `id` is not valid', () => {
      expect(() => {
        entity.setId('46za4d65az4d654zd');
      }).toThrowError();
    });
    test('should correclty update id when `id` is not valid', () => {
      entity.setId('208028462c7817e7ee8df3ab4a67752db67367ea');
      expect(entity.getId()).toBe('208028462c7817e7ee8df3ab4a67752db67367ea');
    });
  });
});
