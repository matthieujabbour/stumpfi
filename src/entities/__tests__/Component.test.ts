/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { ContentTypes, Coordinates, Dimensions } from '../../types';
import Component from '../Component';
import Content from '../Content';
import Template from '../Template';


jest.mock('../Entity');
jest.mock('../Content');
jest.mock('../Template');


describe('Component', () => {
  let content : Content;
  let component : Component;

  beforeEach(() => {
    content = new Content(ContentTypes.MEDIA);
    component = new Component();
  });

  describe('constructor', () => {
    test('should always correctly instanciate when passing `content` argument', () => {
      expect(component.getContents()).toMatchObject([]);
      expect(component.getTemplate()).toBeInstanceOf(Template);
      expect(component.getDimensions()).toMatchObject({ w: 0, h: 0 });
      expect(component.getCoordinates()).toMatchObject({ x: 0, y: 0 });
    });
  });

  test('setContentAt', () => {
    const newContent1 : Content = new Content(ContentTypes.MEDIA);
    const newContent2 : Content = new Content(ContentTypes.MEDIA);
    component.setContentAt(1, newContent1);
    component.setContentAt(4, newContent2);
    component.setContentAt(2, newContent1);
    const contents : (Content | null)[] = component.getContents();
    expect(contents).toMatchObject([null, newContent1, newContent1, null, newContent2]);
  });

  test('setCoordinates', () => {
    component.setCoordinates({ x: 15, y: 25 });
    expect(component.getCoordinates()).toMatchObject({ x: 15, y: 25 });
  });

  test('setDimensions', () => {
    component.setDimensions({ w: 15, h: 25 });
    expect(component.getDimensions()).toMatchObject({ w: 15, h: 25 });
  });

  test('setTemplate', () => {
    const template : Template = new Template('<p>{{MEDIA}}</p>');
    component.setTemplate(template);
    expect(component.getTemplate()).toBe(template);
  });

  test('getText', () => {
    const newContent1 : Content = new Content(ContentTypes.MEDIA);
    const newContent2 : Content = new Content(ContentTypes.MEDIA);
    component.setContentAt(1, newContent1);
    component.setContentAt(4, newContent2);
    component.setContentAt(2, newContent1);
    expect(component.getText()).toBe('test8 test8 test9');
  });

  test('duplicate', () => {
    const newContent1 : Content = new Content(ContentTypes.MEDIA);
    const newContent2 : Content = new Content(ContentTypes.MEDIA);
    const template : Template = new Template('<p>{{MEDIA}}</p>');
    component.setContentAt(1, newContent1);
    component.setContentAt(4, newContent2);
    component.setContentAt(2, newContent1);
    component.setDimensions({ w: 10, h: 100 });
    component.setCoordinates({ x: 50, y: 500 });
    component.setTemplate(template);
    const duplicatedComponent : Component = component.duplicate();
    expect(duplicatedComponent.getDimensions()).toMatchObject({ w: 10, h: 100 });
    expect(duplicatedComponent.getDimensions()).not.toBe(component.getDimensions());
    expect(duplicatedComponent.getCoordinates()).toMatchObject({ x: 50, y: 500 });
    expect(duplicatedComponent.getCoordinates()).not.toBe(component.getCoordinates());
    expect(duplicatedComponent.getContents()).toMatchObject(component.getContents());
    expect(duplicatedComponent.getContents()).not.toBe(component.getContents());
    expect(duplicatedComponent.getTemplate()).toBe(component.getTemplate());
    expect(duplicatedComponent.getId()).not.toBe(component.getId());
  });
});
