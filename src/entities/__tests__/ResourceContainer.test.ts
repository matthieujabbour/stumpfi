/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Resource from '../Resource';
import ResourceContainer from '../ResourceContainer';


jest.mock('../Resource');
jest.mock('../Entity');


/** We must declare a sub-class of Container abstract class to test it. */
class Container extends ResourceContainer {
}


describe('ResourceContainer', () => {
  let container : Container;

  beforeEach(() => {
    container = new Container();
  });

  describe('constructor', () => {
    test('should always correctly instanciate', () => {
      container = new Container();
      expect(container.getResources()).toMatchObject([]);
    });
  });

  describe('addResource', () => {
    test('should add the resource when not already present in the list', () => {
      const resourceOne : Resource = new Resource('script');
      const resourceTwo : Resource = new Resource('script');
      const resourceThree : Resource = new Resource('script');
      container.addResource(resourceOne);
      container.addResource(resourceTwo);
      container.addResource(resourceThree);
      expect(container.getResources()).toMatchObject([resourceOne, resourceTwo, resourceThree]);
      expect(container.getTimestamp()).toBe(3);
    });
    test('should not add the resource when already present in the list', () => {
      const resourceOne : Resource = new Resource('script');
      const resourceTwo : Resource = new Resource('script');
      const resourceThree : Resource = new Resource('script');
      container.addResource(resourceOne);
      container.addResource(resourceTwo);
      container.addResource(resourceThree);
      container.addResource(resourceThree);
      expect(container.getResources()).toMatchObject([resourceOne, resourceTwo, resourceThree]);
      expect(container.getTimestamp()).toBe(3);
    });
  });

  describe('removeResource', () => {
    test('should remove the resource when present in the list', () => {
      const resourceOne : Resource = new Resource('script');
      const resourceTwo : Resource = new Resource('script');
      const resourceThree : Resource = new Resource('script');
      container.addResource(resourceOne);
      container.addResource(resourceTwo);
      container.addResource(resourceThree);
      container.removeResource(resourceTwo);
      expect(container.getResources()).toMatchObject([resourceOne, resourceThree]);
      expect(container.getTimestamp()).toBe(4);
    });
    test('should not remove the resource when not present in the list', () => {
      const resourceOne : Resource = new Resource('script');
      const resourceTwo : Resource = new Resource('script');
      const resourceThree : Resource = new Resource('script');
      container.addResource(resourceOne);
      container.addResource(resourceThree);
      container.removeResource(resourceTwo);
      expect(container.getResources()).toMatchObject([resourceOne, resourceThree]);
      expect(container.getTimestamp()).toBe(2);
    });
  });
});
