/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Document from '../Document';
import Page from '../Page';


jest.mock('../Page');
jest.mock('../Resource');
jest.mock('../ResourceContainer');


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
      expect(document.getTimestamp()).toBe(0);
    });
    test('should correctly set the new name when the `name` argument is valid', () => {
      document.setName('new test name');
      expect(document.getName()).toBe('new test name');
      expect(document.getTimestamp()).toBe(1);
    });
  });

  describe('addTag', () => {
    test('should add the tag when not already present in the list', () => {
      document.addTag('tag1');
      document.addTag('tag2');
      expect(document.getTags()).toMatchObject(['tag1', 'tag2']);
      expect(document.getTimestamp()).toBe(2);
    });
    test('should not add the tag when already present in the list', () => {
      document.addTag('tag1');
      document.addTag('tag2');
      document.addTag('tag1');
      expect(document.getTags()).toMatchObject(['tag1', 'tag2']);
      expect(document.getTimestamp()).toBe(2);
    });
  });

  describe('removeTag', () => {
    test('should remove the tag when present in the list', () => {
      document.addTag('tag1');
      document.addTag('tag2');
      document.removeTag('tag1');
      expect(document.getTags()).toMatchObject(['tag2']);
      expect(document.getTimestamp()).toBe(3);
    });
    test('should not remove the tag when not present in the list', () => {
      document.addTag('tag2');
      document.removeTag('tag1');
      expect(document.getTags()).toMatchObject(['tag2']);
      expect(document.getTimestamp()).toBe(1);
    });
  });

  describe('addAuthor', () => {
    test('should add the author when not already present in the list', () => {
      document.addAuthor('author1');
      document.addAuthor('author2');
      expect(document.getAuthors()).toMatchObject(['author1', 'author2']);
      expect(document.getTimestamp()).toBe(2);
    });
    test('should not add the author when already present in the list', () => {
      document.addAuthor('author1');
      document.addAuthor('author2');
      document.addAuthor('author1');
      expect(document.getAuthors()).toMatchObject(['author1', 'author2']);
      expect(document.getTimestamp()).toBe(2);
    });
  });

  describe('removeAuthor', () => {
    test('should remove the author when present in the list', () => {
      document.addAuthor('author1');
      document.addAuthor('author2');
      document.addAuthor('author3');
      document.removeAuthor('author2');
      expect(document.getAuthors()).toMatchObject(['author1', 'author3']);
      expect(document.getTimestamp()).toBe(4);
    });
    test('should not remove the author when not present in the list', () => {
      document.addAuthor('author2');
      document.removeAuthor('author1');
      expect(document.getAuthors()).toMatchObject(['author2']);
      expect(document.getTimestamp()).toBe(1);
    });
  });

  test('addPage', () => {
    // We test if adding the same page twice has the desired effect.
    const page : Page = new Page();
    document.addPage(page);
    document.addPage(page);
    expect(document.getPages()).toMatchObject([page, page]);
    expect(document.getTimestamp()).toBe(2);
  });

  test('getText', () => {
    const page : Page = new Page();
    document.addPage(page);
    document.addPage(page);
    document.addPage(new Page());
    document.setDescription('test description');
    document.setName('test name');
    document.addTag('tag1');
    document.addTag('tag2');
    document.addAuthor('author1');
    document.addAuthor('author2');
    expect(document.getText()).toBe('test name test description tag1 tag2 author1 author2 text1 master\n\ntext1 master\n\ntext2 master');
  });
});
