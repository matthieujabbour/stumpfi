/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Content from '../Content';


jest.mock('../Entity');


describe('Content', () => {
  let content : Content;

  beforeEach(() => {
    content = new Content('<p><strong>T</strong>est</p>');
  });

  describe('constructor', () => {
    test('should correctly instanciate when passing no argument', () => {
      content = new Content();
      expect(content.getHtml()).toBe('');
    });

    test('should correctly instanciate when passing the `html` argument', () => {
      expect(content.getHtml()).toBe('<p><strong>T</strong>est</p>');
    });
  });

  describe('getText', () => {
    test('non-empty `html`', () => {
      expect(content.getText()).toBe('Test');
    });
    test('empty `html`', () => {
      content.setHtml('');
      expect(content.getText()).toBe('');
    });
  });

  test('duplicate', () => {
    const duplicatedContent : Content = content.duplicate();
    expect(duplicatedContent.getHtml()).toBe(content.getHtml());
    expect(duplicatedContent.getId()).not.toBe(content.getId());
  });
});
