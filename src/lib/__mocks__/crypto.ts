/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


let instances : number = 0;


export const randomBytes : jest.Mock<{ toString : () => string }> = jest.fn(() => {
  const i : string = `${(instances++)}`;
  return {
    toString: () => `${'a1bc2de3fg4hi5jk6lm7no8pq9rs0tu1vw2xy3z0'.substring(0, 40 - i.length)}${i}`,
  };
});
