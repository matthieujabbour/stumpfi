/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


 /** This declaration is necessary to run jest CLI from a file. */
 declare module 'jest-cli' {
  export function run(argv: string[]): void;
}


/** This declaration is necessary to import JSON files into TypeScript files. */
declare module '*.json';


/** JSON type definition. */
type basic = string | number | boolean | null | object;
interface JsonArray extends Array<basic | JsonObject | JsonArray> {}
interface JsonObject { [x: string]: basic | JsonObject | JsonArray; }
type Json = basic | JsonObject | JsonArray;


/** CSS properties type definition. */
interface CssProperties {
  [x : string] : string;
}


/** Custom resource type definition. */
type resourceTag = 'style' | 'script' | 'link';
interface CustomResource {
  readonly tagName : resourceTag;
  readonly content? : string;
  readonly attributes : {
    readonly async? : boolean;
    readonly charSet? : string;
    readonly crossOrigin? : string;
    readonly defer? : boolean;
    readonly integrity? : string;
    readonly nonce? : string;
    readonly src? : string;
    readonly type? : string;
    readonly media? : string;
    readonly scoped? : boolean;
    readonly href? : string;
    readonly hrefLang? : string;
    readonly rel? : string;
    readonly sizes? : string;
    readonly 'data-default'? : boolean;
    'data-page-id'? : string;
  };
}
