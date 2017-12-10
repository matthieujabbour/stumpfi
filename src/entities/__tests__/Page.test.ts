/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { ContentTypes } from '../../types';
import Component from '../Component';
import Content from '../Content';
import Page from '../Page';
import Resource from '../Resource';


jest.mock('../Component');
jest.mock('../Content');
jest.mock('../Resource');
jest.mock('../ResourceContainer');


describe('Page', () => {
  let page : Page;

  beforeEach(() => {
    page = new Page();
    Page.prototype.addResource.mockClear();
    Component.prototype.duplicate.mockClear();
  });

  describe('constructor', () => {
    test('should always correctly instanciate', () => {
      page = new Page();
      expect(page.getMaster()).toBe(null);
      expect(page.getComponents()).toMatchObject([]);
    });
  });

  describe('setMaster', () => {
    test('should throw an error in case of dependencies cycle', () => {
      const master : Page = new Page();
      master.setMaster(page);
      expect(() => page.setMaster(master)).toThrowError();
    });
    test('should correctly add page master if there is no dependencies cycle', () => {
      const master : Page = new Page();
      page.setMaster(master);
      expect(page.getMaster()).toBe(master);
    });
  });

  describe('getResources', () => {
    test('should also retrieve page masters resources when `includeMaster` is set to `true`', () => {
      const master : Page = new Page();
      page.setMaster(master);
      master.setMaster(new Page());
      expect(page.getResources().length).toBe(6);
    });
    test('should not retrieve page masters resources when `includeMaster` is set to `false`', () => {
      const master : Page = new Page();
      page.setMaster(master);
      master.setMaster(new Page());
      expect(page.getResources(false).length).toBe(2);
    });
  });

  describe('addComponent', () => {
    test('should add the component when not already present in the list', () => {
      const component : Component = new Component();
      page.addComponent(component);
      expect(page.getComponents()).toMatchObject([component]);
    });
    test('should not add the component when already present in the list', () => {
      const component : Component = new Component();
      page.addComponent(component);
      page.addComponent(component);
      expect(page.getComponents()).toMatchObject([component]);
    });
  });

  describe('removeComponent', () => {
    test('should remove the component when present in the list', () => {
      const component : Component = new Component();
      page.addComponent(component);
      page.removeComponent(component);
      expect(page.getComponents()).toMatchObject([]);
    });
    test('should not remove the component when not present in the list', () => {
      const component : Component = new Component();
      page.removeComponent(component);
      expect(page.getComponents()).toMatchObject([]);
    });
  });

  describe('getComponents', () => {
    test('should also retrieve page master components when `includeMaster` is set to `true`', () => {
      const component1 : Component = new Component();
      const component2 : Component = new Component();
      const component3 : Component = new Component();
      const master1 : Page = new Page();
      const master2 : Page = new Page();
      master1.addComponent(component1);
      master2.addComponent(component2);
      page.addComponent(component3);
      master1.setMaster(master2);
      page.setMaster(master1);
      expect(page.getComponents()).toMatchObject([component2, component1, component3]);
    });
    test('should not retrieve page master components when `includeMaster` is set to `false`', () => {
      const component1 : Component = new Component();
      const component2 : Component = new Component();
      const component3 : Component = new Component();
      const master1 : Page = new Page();
      const master2 : Page = new Page();
      master1.addComponent(component1);
      master2.addComponent(component2);
      page.addComponent(component3);
      master1.setMaster(master2);
      page.setMaster(master1);
      expect(page.getComponents(false)).toMatchObject([component3]);
    });
  });

  describe('getText', () => {
    test('should also retrieve page master text when `includeMaster` is set to `true`', () => {
      const component1 : Component = new Component();
      const component2 : Component = new Component();
      const component3 : Component = new Component();
      const master1 : Page = new Page();
      const master2 : Page = new Page();
      master1.addComponent(component1);
      master2.addComponent(component2);
      page.addComponent(component3);
      master1.setMaster(master2);
      page.setMaster(master1);
      expect(page.getText()).toBe('text11 text10 text12');
    });
    test('should not retrieve page master text when `includeMaster` is set to `false`', () => {
      const component1 : Component = new Component();
      const component2 : Component = new Component();
      const component3 : Component = new Component();
      const master1 : Page = new Page();
      const master2 : Page = new Page();
      master1.addComponent(component1);
      master2.addComponent(component2);
      page.addComponent(component3);
      master1.setMaster(master2);
      page.setMaster(master1);
      expect(page.getText(false)).toBe('text15');
    });
  });

  describe('duplicate', () => {
    test('should correctly duplicate when having a page master', () => {
      const component : Component = new Component();
      const resource : Resource = new Resource('link');
      const master : Page = new Page();
      page.addComponent(component);
      page.setMaster(master);
      const duplicatedPage : Page = page.duplicate();
      expect(duplicatedPage.getMaster()).toBe(master);
      expect(duplicatedPage.getComponents().length).toBe(1);
      expect(duplicatedPage.addResource).toHaveBeenCalledTimes(2);
      expect(component.duplicate).toHaveBeenCalledTimes(1);
      expect(duplicatedPage.getId()).not.toBe(page.getId());
    });
    test('should correctly duplicate when not having a page master', () => {
      const component : Component = new Component();
      const resource : Resource = new Resource('link');
      page.addComponent(component);
      const duplicatedPage : Page = page.duplicate();
      expect(duplicatedPage.getMaster()).toBe(null);
      expect(duplicatedPage.getComponents().length).toBe(1);
      expect(duplicatedPage.addResource).toHaveBeenCalledTimes(2);
      expect(component.duplicate).toHaveBeenCalledTimes(1);
      expect(duplicatedPage.getId()).not.toBe(page.getId());
    });
  });
});
