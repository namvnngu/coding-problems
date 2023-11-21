/**
 * Define a type TupleUnion that takes 2 tuples of any length and returns
 * a tuple of the union of elements in matching positions.
 *
 * __Test cases:__
 *
 * ```ts
 * // same length
 * type Test1 = TupleUnion<[string, boolean], [number, number]> // [string | number, boolean | number]
 *
 * // different lengths
 * type Test2 = TupleUnion<['first', 'second'], [2, 4, 6, 8]>   // ['first' | 2, 'second' | 4, undefined | 6, undefined | 8]
 * ```
 */

/**
 * My solution
 */
type TupleUnion<T1 extends any[], T2 extends any[]> = _BuildTupleUnion<T1, T2>;

type _BuildTupleUnion<
  T1 extends any[],
  T2 extends any[],
  Bigger extends any[] = BiggerArray<T1, T2>,
  Result extends any[] = []
> = Result["length"] extends Bigger["length"]
  ? Result
  : _BuildTupleUnion<T1, T2, Bigger, [...Result, T1[Result["length"]] | T2[Result["length"]]]>;

type CONSTANT = "X";
type BiggerArray<T1 extends any[], T2 extends any[]> = ArrayOfN<
  T1["length"]
> extends [...ArrayOfN<T2["length"]>, ...CONSTANT[]]
  ? T1
  : T2;
type ArrayOfN<
  N extends number,
  Result extends CONSTANT[] = []
> = Result["length"] extends N ? Result : ArrayOfN<N, [...Result, CONSTANT]>;

// same length
type Test1 = TupleUnion<[string, boolean], [number, number]>; // [string | number, boolean | number]
// different lengths
type Test2 = TupleUnion<["first", "second"], [2, 4, 6, 8]>; // ['first' | 2, 'second' | 4, undefined | 6, undefined | 8]

/**
 * Sam's solution
 */
export type TupleToObject<T extends any[]> = Omit<T, keyof any[]>;

export type ObjectToTuple<T> = T extends Record<number, any>
  // if it's in a tuplable object format ({0: Type; 1: Type; 2: Type }), seed the recursion with an empty tuple
  ? _BuildTuple<T, []>
  : never;
type _BuildTuple<
  T extends Record<number, any>,
  Result extends any[] = [],
> = keyof T extends never
  // when we've removed all of the keys from T, end the recursion
  ? Result
  // if there are still keys left in T then pull the "next" element from T and spread into Result
  : _BuildTuple<
      // pass the source object, removing the key that matches the length of the current result
      Omit<T, `${Result["length"]}` | Result["length"]>,
      // pass the target tuple, adding the type that matches the key at the next position in the tuple
      [...Result, T[Result["length"]]]
    >;

export type ObjectUnion<
  T1 extends Record<any, any>,
  T2 extends Record<any, any>,
> =
  // just the common keys
  { [K in keyof (T1 | T2)]: (T1 | T2)[K] }
  // combined with partials of the non-overlapping keys
  & Partial<
    Omit<T1, keyof T1 & keyof T2> & Omit<T2, keyof T1 & keyof T2>
  >;

type Sam_TupleUnion<T1 extends any[], T2 extends any[]> = ObjectToTuple<
  ObjectUnion<TupleToObject<T1>, TupleToObject<T2>>
>;

// same length
export type Sam_Test1 = Sam_TupleUnion<[string, boolean], [number, number]>; // [string | number, boolean | number]
// different lengths
export type Sam_Test2 = Sam_TupleUnion<["first", "second"], [2, 4, 6, 8]>; // ['first' | 2, 'second' | 4, undefined | 6, undefined | 8]
