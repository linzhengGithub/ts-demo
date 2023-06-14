// 高级内置工具类型

// 属性修饰进阶
// 深层的属性修饰 & 基于已知属性的部分修饰，以及基于属性类型的部分修饰

// 内置类型 - PromiseValue
// T 是一个类型参数，它表示一个任意的 TypeScript 类型。
// T extends Promise<infer V> 是一个条件类型。它检查 T 是否是一个 Promise 类型的扩展（或者是 Promise 类型本身）。如果是，它会将 V 推断为 Promise 的泛型参数。
// ? 表示条件类型的分支。在这种情况下，如果条件成立（即 T 是 Promise 类型或其扩展），则执行 PromiseValue<V>，否则执行 T。
// PromiseValue<V> 是递归定义的一部分。它是用来获取 Promise 类型的解析值的类型。也就是说，如果 V 是一个 Promise 类型，那么 PromiseValue<V> 将返回 V 的解析值的类型；否则，它将返回 V 本身。
// 最终，PromiseValue<T> 的定义表示：如果 T 是一个 Promise 类型或其扩展，那么 PromiseValue<T> 将返回 T 的解析值的类型；否则，它将返回 T 本身。
type _PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;

// 创造一个类型 - 递归遍历一个object类型的ts类型
// 递归可选
type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
// 递归必选
type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};
// 递归不可变
type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
// 递归可变
type DeepMutable<T extends object> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

// 内置类型 - NonNullable 
// NonNullable,DeepNullable 要在开启 --strictNullChecks 下才能正常工作。
type _NonNullable<T> = T extends null | undefined ? never : T;

type Nullable<T> = T | null;
type DeepNullable<T extends object> = {
  [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> : Nullable<T[K]>;
};

