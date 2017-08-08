/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/** This declaration is necessary to run jest CLI from a file. */
declare module 'jest-cli' {
  export function run(argv: string[]): void;
}