/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/** Content's types list declaration. */
export const enum ContentTypes {
  MEDIA = 'MEDIA',
  RICH_TEXT = 'RICH_TEXT',
  SIMPLE_TEXT = 'SIMPLE_TEXT',
}


/** Resource attributes list type declaration. */
export interface Attributes {
  [key : string] : string | boolean;
}


/** Component's coordinates type definition. */
export interface Coordinates {
  x : number;
  y : number;
}


/** Component's dimensions type definition. */
export interface Dimensions {
  w : number;
  h : number;
}
