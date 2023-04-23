// 类型里的逻辑运算

// ValueA === ValueB ? Result1 : Result2;
// TypeA extends TypeB ? Result1 : Result2;

// infer关键词 -> inference
type Func = (...args: any[]) => any;

type FunctionReturnType<T extends Func> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]

type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // string | number

// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

// 递归的方式
// type PromiseValue<T> = T extends Promise<infer V>
//   ? V extends Promise<infer N>
//   ? N
//   : V
//   : T;

type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;


// 分布式条件类型 - 条件类型在满足一定情况下会执行的逻辑
type Condition<T> = T extends 1 | 2 | 3 ? T : never;

// 1 | 2 | 3
type ConditionRes1 = Condition<1 | 2 | 3 | 4 | 5>;

// never
type ConditionRes2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;

// 自动分发
type Naked<T> = T extends boolean ? "Y" : "N";

// (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
// "N" | "Y"
type Res3 = Naked<number | boolean>;

// 交集
type Intersection<A, B> = A extends B ? A : never;

type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>; // 2 | 3

// isAny 与 isUnknown
type IsAny<T> = 0 extends 1 & T ? true : false;
type isAny = IsUnknown<any>

type IsUnknown<T> = unknown extends T
  ? IsAny<T> extends true
    ? false
    : true
  : false;
  
type isUnknown = IsUnknown<unknown>
