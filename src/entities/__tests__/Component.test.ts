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
  let component : Component;

  beforeEach(() => {
    component = new Component();
  });

  describe('constructor', () => {
    test('should correctly instanciate when passing no argument', () => {
      expect(component.getContents()).toMatchObject([]);
      expect(component.getTemplate()).toBeInstanceOf(Template);
      expect(component.getDimensions()).toMatchObject({ w: 0, h: 0 });
      expect(component.getCoordinates()).toMatchObject({ x: 0, y: 0 });
    });
    test('should correctly instanciate when passing `template` argument', () => {
      const template : Template = new Template('<p>{{SIMPLE_TEXT}}</p>');
      component = new Component(template);
      expect(component.getContents()).toMatchObject([]);
      expect(component.getTemplate()).toBe(template);
      expect(component.getDimensions()).toMatchObject({ w: 0, h: 0 });
      expect(component.getCoordinates()).toMatchObject({ x: 0, y: 0 });
    });
    test('should correctly instanciate when passing `dimensions` argument', () => {
      const dimensions : Dimensions = { w: 45, h: 12 };
      component = new Component(undefined, dimensions);
      expect(component.getContents()).toMatchObject([]);
      expect(component.getTemplate()).toBeInstanceOf(Template);
      expect(component.getDimensions()).toBe(dimensions);
      expect(component.getCoordinates()).toMatchObject({ x: 0, y: 0 });
    });
    test('should correctly instanciate when passing `coordinates` argument', () => {
      const coordinates : Coordinates = { x: 16, y: 6 };
      component = new Component(undefined, undefined, coordinates);
      expect(component.getContents()).toMatchObject([]);
      expect(component.getTemplate()).toBeInstanceOf(Template);
      expect(component.getDimensions()).toMatchObject({ w: 0, h: 0 });
      expect(component.getCoordinates()).toBe(coordinates);
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
    expect(component.getTimestamp()).toBe(3);
  });

  test('setCoordinates', () => {
    component.setCoordinates({ x: 15, y: 25 });
    expect(component.getCoordinates()).toMatchObject({ x: 15, y: 25 });
    expect(component.getTimestamp()).toBe(1);
  });

  test('setDimensions', () => {
    component.setDimensions({ w: 15, h: 25 });
    expect(component.getDimensions()).toMatchObject({ w: 15, h: 25 });
    expect(component.getTimestamp()).toBe(1);
  });

  test('setTemplate', () => {
    const template : Template = new Template('<p>{{MEDIA}}</p>');
    component.setTemplate(template);
    expect(component.getTemplate()).toBe(template);
    expect(component.getTimestamp()).toBe(1);
  });

  test('getText', () => {
    const newContent1 : Content = new Content(ContentTypes.MEDIA);
    const newContent2 : Content = new Content(ContentTypes.MEDIA);
    component.setContentAt(1, newContent1);
    component.setContentAt(4, newContent2);
    component.setContentAt(2, newContent1);
    expect(component.getText()).toBe('text2 text2 text3');
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
