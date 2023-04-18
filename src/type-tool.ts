// 类型工具: 操作符, 关键词, 专用语法

// interface 用来描述对象、类的结构，而类型别名用来将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型
// 类型别名 type
// 联合类型
type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);

const status1: StatusCode = 502;
// 函数类型
type Handler = (e: Event) => void;

const clickHandler: Handler = (e) => { };
// 工具类型 - 同样基于类型别名，只是多了个泛型
//  - 主要意义: 是基于传入的泛型进行各种类型操作，得到一个新的类型
type Factory<T> = T | number | string;
// 方式1:
const toolType1: Factory<boolean> = true;
// 方式2:
type FactoryWithBool = Factory<boolean>;
const toolType2: FactoryWithBool = true;
// 实际例子: 确保使用中处理的可能为空值的属性
type MaybeNull<T> = T | null;

function processFn(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler();
}
// 实际例子: 确保是一个数组
type MaybeArray<T> = T | T[];

function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

// 联合类型和交叉类型
// 联合类型 | 或 (满足其一)
type roomNameType = string | number
// 交叉类型 & 且 (全部满足)
interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct

// 索引类型: 索引签名类型、索引类型查询与索引类型访问
//  - 索引签名类型: 快速声明一个键值类型一致的类型结构
interface AllStringTypes {
  [key: string]: boolean;
}
// obj[599] 和 obj['599'] 的效果是一致的
const xxxxx:AllStringTypes = {
  name: true,
  age: true,
  x: true,
  c: true,
}
//  - 索引类型查询
interface Foo {
  linbudu: 1,
  599: 2
}

// type FooKeys = keyof Foo; // "linbudu" | 599
// 在 VS Code 中悬浮鼠标只能看到 'keyof Foo'
// 看不到其中的实际值，你可以这么做：
type FooKeys = keyof Foo & {}; // "linbudu" | 599

// keyof操作符: 它可以将对象中的所有键转换为对应字面量类型，然后再组合成 联合类型 ps:数字类型的键名还是数字类型字面量
const ag:FooKeys = 599

//  - 索引类型访问
// 通过 obj[expression] 的方式来动态访问一个对象属性
interface FooObj {
  propA: number;
  propB: boolean;
  propC: () => {}
  propD: () => void
}

type PropAType = FooObj['propA']; // number
type PropBType = FooObj['propB']; // boolean
// 使用keyof一次性获得所以键的字面量
type PropTypeUnion = FooObj[keyof FooObj]; // number | boolean

// 映射类型: 主要作用即是基于键名映射到键值类型
type Clone<T> = {
  [K in keyof T]: T[K]
}

type CloneTarget = Clone<FooObj>
