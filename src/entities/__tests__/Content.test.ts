/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { ContentTypes } from '../../types';
import Content from '../Content';


jest.mock('../Entity');


describe('Content', () => {
  let content : Content;

  beforeEach(() => {
    content = new Content(ContentTypes.RICH_TEXT, 'Test');
  });

  describe('constructor', () => {
    test('should correctly instanciate when only passing the `type` argument', () => {
      content = new Content(ContentTypes.SIMPLE_TEXT);
      expect(content.getType()).toBe(ContentTypes.SIMPLE_TEXT);
      expect(content.getMarkupText()).toBe('');
    });

    test('should correctly instanciate when passing both `type` and `markupText` arguments', () => {
      expect(content.getType()).toBe(ContentTypes.RICH_TEXT);
      expect(content.getMarkupText()).toBe('Test');
    });
  });

  test('setType', () => {
    content.setType(ContentTypes.MEDIA);
    expect(content.getType()).toBe(ContentTypes.MEDIA);
  });

  test('setMarkupText', () => {
    content.setMarkupText('Test 2');
    expect(content.getMarkupText()).toBe('Test 2');
  });

  describe('getText', () => {
    test('non-empty `markupText`', () => {
      expect(content.getMarkupText()).toBe('Test');
    });
    test('empty `markupText`', () => {
      content.setMarkupText('');
      expect(content.getText()).toBe('');
    });
  });

  test('duplicate', () => {
    const duplicatedContent : Content = content.duplicate();
    expect(duplicatedContent.getType()).toBe(content.getType());
    expect(duplicatedContent.getMarkupText()).toBe(content.getMarkupText());
    expect(duplicatedContent.getId()).not.toBe(content.getId());
  });
});
