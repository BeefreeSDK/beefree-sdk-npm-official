type Kebab<T extends string, A extends string = ""> =
    T extends `${infer F}${infer R}` ?
    Kebab<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`> :
    A

export type KebabKeys<T> = { [K in keyof T as K extends string ? Kebab<K> : K]: T[K] };

export type ValueOf<T> = T[keyof T];

export type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends Record<string, unknown> ? RecursivePartial<T[P]> :
      T[P];
};

export type RecursiveRequired<T> = Required<{
  [P in keyof T]: T[P] extends Record<string, unknown> | undefined ? RecursiveRequired<Required<T[P]>> : T[P];
}>;

// Require at least one key to be present
export type RequireAtLeastOne<T, K extends keyof T = keyof T> =
  { [P in K]: Required<Pick<T, P>> & Partial<Omit<T, P>> }[K]
