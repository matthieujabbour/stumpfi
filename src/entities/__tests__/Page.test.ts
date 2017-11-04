/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Component from '../Component';
import Content from '../Content';
import Page from '../Page';
import Resource from '../Resource';


jest.mock('../Entity');
jest.mock('../Component');
jest.mock('../Content');
jest.mock('../Resource');


describe('Page', () => {
  let page : Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('constructor', () => {
    test('should always correctly instanciate', () => {
      page = new Page();
      expect(page.getMaster()).toBe(null);
      expect(page.getResources()).toMatchObject([]);
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

  describe('addResource', () => {
    test('should add the resource when not already present in the list', () => {
      const resource : Resource = new Resource('script');
      page.addResource(resource);
      expect(page.getResources()).toMatchObject([resource]);
    });
    test('should not add the resource when already present in the list', () => {
      const resource : Resource = new Resource('script');
      page.addResource(resource);
      page.addResource(resource);
      expect(page.getResources()).toMatchObject([resource]);
    });
  });

  describe('removeResource', () => {
    test('should remove the resource when present in the list', () => {
      const resource : Resource = new Resource('script');
      page.addResource(resource);
      page.removeResource(0);
      expect(page.getResources()).toMatchObject([]);
    });
    test('should not remove the resource when not present in the list', () => {
      page.removeResource(0);
      expect(page.getResources()).toMatchObject([]);
    });
  });

  describe('addComponent', () => {
    test('should add the component when not already present in the list', () => {
      const component : Component = new Component(new Content());
      page.addComponent(component);
      expect(page.getComponents()).toMatchObject([component]);
    });
    test('should not add the component when already present in the list', () => {
      const component : Component = new Component(new Content());
      page.addComponent(component);
      page.addComponent(component);
      expect(page.getComponents()).toMatchObject([component]);
    });
  });

  describe('removeComponent', () => {
    test('should remove the component when present in the list', () => {
      const component : Component = new Component(new Content());
      page.addComponent(component);
      page.removeComponent(0);
      expect(page.getComponents()).toMatchObject([]);
    });
    test('should not remove the component when not present in the list', () => {
      page.removeComponent(0);
      expect(page.getComponents()).toMatchObject([]);
    });
  });

  describe('getComponents', () => {
    test('should also retrieve page master components when `includeMaster` is set to `true`', () => {
      const component : Component = new Component(new Content());
      const master : Page = new Page();
      master.addComponent(component);
      page.setMaster(master);
      expect(page.getComponents(true)).toMatchObject([component]);
    });
    test('should not retrieve page master components when `includeMaster` is set to `false`', () => {
      const component : Component = new Component(new Content());
      const master : Page = new Page();
      master.addComponent(component);
      page.setMaster(master);
      expect(page.getComponents(false)).toMatchObject([]);
    });
  });

  describe('getResources', () => {
    test('should also retrieve page master resources when `includeMaster` is set to `true`', () => {
      const resource : Resource = new Resource('link');
      const master : Page = new Page();
      master.addResource(resource);
      page.setMaster(master);
      expect(page.getResources(true)).toMatchObject([resource]);
    });
    test('should not retrieve page master resources when `includeMaster` is set to `false`', () => {
      const resource : Resource = new Resource('link');
      const master : Page = new Page();
      master.addResource(resource);
      page.setMaster(master);
      expect(page.getResources(false)).toMatchObject([]);
    });
  });

  describe('getText', () => {
    test('should also retrieve page master text when `includeMaster` is set to `true`', () => {
      const component : Component = new Component(new Content());
      const master : Page = new Page();
      master.addComponent(component);
      page.setMaster(master);
      expect(page.getText(true)).toBe('text5');
    });
    test('should not retrieve page master text when `includeMaster` is set to `false`', () => {
      const component : Component = new Component(new Content());
      const master : Page = new Page();
      master.addComponent(component);
      page.setMaster(master);
      expect(page.getText(false)).toBe('');
    });
  });


  test('duplicate', () => {
    const component : Component = new Component(new Content());
    const resource : Resource = new Resource('link');
    const master : Page = new Page();
    page.addComponent(component);
    page.addResource(resource);
    page.setMaster(master);
    const duplicatedPage : Page = page.duplicate();
    expect(duplicatedPage.getComponents()[0]).not.toBe(component);
    expect(duplicatedPage.getMaster()).toBe(master);
    expect(duplicatedPage.getResources()[0]).not.toBe(resource);
    expect(duplicatedPage.getId()).not.toBe(page.getId());
  });
});
