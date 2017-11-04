/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Document from '../Document';
import Page from '../Page';
import Resource from '../Resource';


jest.mock('../Entity');
jest.mock('../Page');
jest.mock('../Resource');


describe('Document', () => {
  let document : Document;

  beforeEach(() => {
    document = new Document();
  });

  describe('constructor', () => {
    test('should throw an error when the `name` argument is not valid', () => {
      expect(() => document = new Document('\\/.<>')).toThrowError();
    });
    test('should correctly instanciate when the `name` argument is valid', () => {
      document = new Document('test name', 'test description');
      expect(document.getName()).toBe('test name');
      expect(document.getDescription()).toBe('test description');
      expect(document.getAuthors()).toMatchObject([]);
      expect(document.getPages()).toMatchObject([]);
      expect(document.getResources()).toMatchObject([]);
      expect(document.getTags()).toMatchObject([]);
    });
  });

  describe('setName', () => {
    test('should throw an error when the `name` argument is not valid', () => {
      expect(() => document.setName('test?')).toThrowError();
    });
    test('should correctly set the new name when the `name` argument is valid', () => {
      document.setName('new test name');
      expect(document.getName()).toBe('new test name');
    });
  });

  describe('addTag', () => {
    test('should add the tag when not already present in the list', () => {
      document.addTag('tag1');
      expect(document.getTags()).toMatchObject(['tag1']);
    });
    test('should not add the tag when already present in the list', () => {
      document.addTag('tag1');
      document.addTag('tag1');
      expect(document.getTags()).toMatchObject(['tag1']);
    });
  });

  describe('removeTag', () => {
    test('should remove the tag when present in the list', () => {
      document.addTag('tag1');
      document.addTag('tag2');
      document.removeTag('tag1');
      expect(document.getTags()).toMatchObject(['tag2']);
    });
    test('should not remove the tag when not present in the list', () => {
      document.addTag('tag2');
      document.removeTag('tag1');
      expect(document.getTags()).toMatchObject(['tag2']);
    });
  });

  describe('addAuthor', () => {
    test('should add the author when not already present in the list', () => {
      document.addAuthor('author1');
      expect(document.getAuthors()).toMatchObject(['author1']);
    });
    test('should not add the author when already present in the list', () => {
      document.addAuthor('author1');
      document.addAuthor('author1');
      expect(document.getAuthors()).toMatchObject(['author1']);
    });
  });

  describe('removeAuthor', () => {
    test('should remove the author when present in the list', () => {
      document.addAuthor('author1');
      document.addAuthor('author2');
      document.removeAuthor('author1');
      expect(document.getAuthors()).toMatchObject(['author2']);
    });
    test('should not remove the author when not present in the list', () => {
      document.addAuthor('author2');
      document.removeTag('author1');
      expect(document.getAuthors()).toMatchObject(['author2']);
    });
  });

  describe('addResource', () => {
    test('should add the resource when not already present in the list', () => {
      const resource : Resource = new Resource('script');
      document.addResource(resource);
      expect(document.getResources()).toMatchObject([resource]);
    });
    test('should not add the resource when already present in the list', () => {
      const resource : Resource = new Resource('script');
      document.addResource(resource);
      document.addResource(resource);
      expect(document.getResources()).toMatchObject([resource]);
    });
  });

  describe('removeResource', () => {
    test('should remove the resource when present in the list', () => {
      const resource : Resource = new Resource('script');
      document.addResource(resource);
      document.removeResource(resource);
      expect(document.getResources()).toMatchObject([]);
    });
    test('should not remove the resource when not present in the list', () => {
      const resource : Resource = new Resource('script');
      document.removeResource(resource);
      expect(document.getResources()).toMatchObject([]);
    });
  });

  test('addPage', () => {
    const page : Page = new Page();
    document.addPage(page);
    expect(document.getPages()).toMatchObject([page]);
  });

  test('getText', () => {
    const page : Page = new Page();
    document.addPage(page);
    document.addPage(page);
    document.setDescription('test description');
    document.setName('test name');
    document.addTag('tag1');
    document.addTag('tag2');
    document.addAuthor('author1');
    document.addAuthor('author2');
    expect(document.getText()).toBe('test name test description tag1 tag2 author1 author2 test1\n\ntest1');
  });
});
