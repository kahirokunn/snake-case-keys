## Install

Install with npm:

```sh
$ npm install --save @kahirokunn/snake-case-keys
```

Install with yarn:

```sh
$ yarn add @kahirokunn/snake-case-keys
```

## snakecaseKeys Usage

```typescript
import { shallowSnakeCaseKeys, deepSnakeCaseKeys } from '@kahirokunn/snake-case-keys';

a = {
  helloWorld: {
    ohMyGod: {
      soCrazy: 'hello',
      sorryMan: 0.8989,
    },
    okGood: {
      yeah: 3232,
    },
  },
  _goodbuyWorld: {
    finish: 'world',
  }
}

shallowSnakeCaseKeys(a);
/*
return
{
  hello_world: {
    ohMyGod: {
      soCrazy: "hello",
      sorryMan: 0.8989
    },
    okGood: {
      yeah: 3232
    }
  },
  _goodbuy_world: {
    finish: "world"
  }
}
*/

deepSnakeCaseKeys(a);
/*
return
{
  hello_world: {
    oh_my_god: {
      so_crazy: "hello",
      sorry_man: 0.8989
    },
    ok_good: {
      yeah: 3232
    }
  },
  goodbuy_world: {
    finish: "world"
  }
}
*/
```
