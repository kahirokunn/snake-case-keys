import type { SnakeCase } from 'type-fest';

type ShallowSnakeCase<T> = T extends Array<infer U>
  ? Array<
      {
        [K in keyof U as SnakeCase<K>]: U[K];
      }
    >
  : {
      [K in keyof T as SnakeCase<K>]: T[K];
    };

type DeepSnakeCase<T> = T extends Array<infer U>
  ? Array<
      {
        [K in keyof U as SnakeCase<K>]: U[K];
      }
    >
  : {
      [K in keyof T as SnakeCase<K>]: DeepSnakeCase<T[K]>;
    };

function camelToSnake<T extends string>(a: T) {
  return a.replace(
    /([A-Z])/g,
    (s) => `_${s.charAt(0).toLowerCase()}`,
  ) as SnakeCase<T>;
}

export function shallowSnakeCaseKeys<T>(object: T): ShallowSnakeCase<T> {
  return Object.keys(object).reduce(
    (base, camelKey) => ({
      ...base,
      [camelToSnake(camelKey)]: (object as any)[camelKey],
    }),
    {},
  ) as any;
}

export function deepSnakeCaseKeys<T>(object: T): DeepSnakeCase<T> {
  return Object.keys(object).reduce(
    (base, camelKey) => ({
      ...base,
      [camelToSnake(camelKey)]: deepSnakeCaseKeys((object as any)[camelKey]),
    }),
    {},
  ) as any;
}
