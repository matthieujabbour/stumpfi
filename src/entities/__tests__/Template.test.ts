/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Template from '../Template';


jest.mock('../ResourceContainer');


describe('Template', () => {
  let template : Template;

  beforeEach(() => {
    template = new Template('<p><strong>Test with two variables :</strong><div>{MEDIA}</div><div>{RICH_TEXT}</div></p>');
  });

  describe('constructor', () => {
    test('should always correctly instanciate', () => {
      expect(template.getCode()).toBe('<p><strong>Test with two variables :</strong><div>{MEDIA}</div><div>{RICH_TEXT}</div></p>');
    });
  });

  test('setCode', () => {
    template.setCode('<a>{SIMPLE_TEXT}</a>');
    expect(template.getCode()).toBe('<a>{SIMPLE_TEXT}</a>');
  });
});
