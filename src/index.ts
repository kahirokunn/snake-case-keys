import type { SnakeCase } from 'type-fest';
import map from 'map-obj';

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
  ? Array<DeepSnakeCase<U>>
  : {
      [K in keyof T as SnakeCase<K>]: DeepSnakeCase<T[K]>;
    };

function camelToSnake<T extends string>(a: T) {
  return a.replace(
    /([A-Z])/g,
    (s) => `_${s.charAt(0).toLowerCase()}`,
  ) as SnakeCase<T>;
}

export function shallowSnakeCaseKeys<T>(
  object: T,
): T extends Array<any> ? never : ShallowSnakeCase<T> {
  return Object.keys(object).reduce(
    (base, camelKey) => ({
      ...base,
      [camelToSnake(camelKey)]: (object as any)[camelKey],
    }),
    {},
  ) as any;
}

export function deepSnakeCaseKeys<T>(object: T): DeepSnakeCase<T> {
  return map(
    object,
    (key, val) => [
      (typeof key === 'number' || typeof key === 'symbol'
        ? key
        : camelToSnake(key as string)) as any,
      val,
    ],
    { deep: true },
  ) as any;
}
