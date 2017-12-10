/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Resource from '../Resource';


jest.mock('../Entity');


describe('Resource', () => {
  let resource : Resource;

  beforeEach(() => {
    resource = new Resource('script');
  });

  describe('constructor', () => {
    test('should always correctly instanciate when passing a valid `type` argument', () => {
      expect(resource.getType()).toBe('script');
      expect(resource.getContent()).toBe(null);
      expect(resource.getAttributes()).toMatchObject({});
    });
  });

  describe('duplicate', () => {
    test('should correctly duplicate with a non-empty content', () => {
      resource.setAttribute('test-attribute', 'testValue');
      resource.setAttribute('other-test-attribute', 'OtherTestValue');
      resource.setContent('const content = new Test();');
      const duplicatedResource : Resource = resource.duplicate();
      expect(duplicatedResource.getType()).toBe('script');
      expect(duplicatedResource.getContent()).toBe('const content = new Test();');
      expect(duplicatedResource.getAttributes()).toMatchObject({
        'test-attribute': 'testValue',
        'other-test-attribute': 'OtherTestValue',
      });
      expect(duplicatedResource.getId()).not.toBe(resource.getId());
    });
    test('should correctly duplicate with an empty content', () => {
      resource.setAttribute('test-attribute', 'testValue');
      resource.setAttribute('other-test-attribute', 'OtherTestValue');
      const duplicatedResource : Resource = resource.duplicate();
      expect(duplicatedResource.getType()).toBe('script');
      expect(duplicatedResource.getAttributes()).toMatchObject({
        'test-attribute': 'testValue',
        'other-test-attribute': 'OtherTestValue',
      });
      expect(duplicatedResource.getId()).not.toBe(resource.getId());
    });
  });
});
