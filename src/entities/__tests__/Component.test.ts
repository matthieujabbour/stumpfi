/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Component from '../Component';
import Content from '../Content';


jest.mock('../Entity');
jest.mock('../Content');


describe('Component', () => {
  let content : Content;
  let component : Component;

  beforeEach(() => {
    content = new Content();
    component = new Component(content);
  });

  describe('constructor', () => {
    test('should always correctly instanciate when passing `content` argument', () => {
      expect(component.getClassName()).toBe('');
      expect(component.getContent()).toBe(content);
      expect(component.getStyle()).toMatchObject({});
    });
  });

  test('getText', () => {
    expect(component.getText()).toBe('test1');
  });

  test('duplicate', () => {
    const newContent : Content = new Content();
    component.setClassName('testClassName');
    component.setStyle({ width: '100px', height: '200px' });
    component.setContent(newContent);
    const duplicatedComponent : Component = component.duplicate();
    expect(duplicatedComponent.getClassName()).toBe('testClassName');
    expect(duplicatedComponent.getStyle()).toMatchObject({ width: '100px', height: '200px' });
    expect(duplicatedComponent.getContent()).toBe(newContent);
    expect(duplicatedComponent.getId()).not.toBe(component.getId());
  });
});
