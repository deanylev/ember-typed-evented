# Ember Typed Evented
[typed-emitter](https://www.npmjs.com/package/typed-emitter) but for Ember Evented.

## Installation
```
npm install ember-typed-evented --save-dev
# or
yarn add --dev ember-typed-evented
# or
pnpm add -D ember-typed-evented
```

## Caveats
The handler arg must be a method, not a key that corresponds to a method on the target.

E.g. `this.platform.on('foo', this.handleFoo)` instead of `this.platform.on('foo', 'handleFoo')`

PRs welcome, I'm sure it's possible with TS.

## Usage
```
import Evented from '@ember/object/evented';
import Service from '@ember/service';

import { createdTypedEvented } from 'ember-typed-evented';

type Events = {
  foo: () => void;
  bar: (arg1: string, arg2: number) => void;
};

export default class MyAwesomeService extends Service.extend(createdTypedEvented<Events>(Evented)) {
  myMethod() {
    this.trigger('foo'); // nice
    this.trigger('bar', 'myString', 1); // nice

    this.trigger('baz'); // not nice - we haven't declared this emit
    this.trigger('foo', 1); // not nice - this emit doesn't take any args
  }
}

// ... elsewhere

export default class MyAwesomeComponent extends Component {
  @service declare myAwesomeService: MyAwesomeService;

  constructor() {
    this.myAwesomeService.one('bar', (firstArg, secondArg) => {
      // firstArg and secondArg automatically typed
    });
  }
}
```
