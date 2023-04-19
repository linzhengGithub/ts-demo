// 泛型
type testGenericType = {
  name: string
  age: number
  address: string
}
interface testGenericItf {
  name: string
  age: number
  address: string
}
// 传入一个类型/接口实现全是string类型的键名type
type Stringify<T> = {
  [K in keyof T]: string;
};

type testT = Stringify<testGenericType>

// 完全复制 泛型 中的类型
type CloneType<T> = {
  [C in keyof T]: T[C]
}

type testC = CloneType<testGenericType>

// 复制 至 可选类型
type PartialType<T> = {
  [P in keyof T]?: T[P];
};

type testP = PartialType<testGenericType>

// 条件类型
type IsEqual<T> = T extends true ? 1 : 2

type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<'linbudu'>; // 2

// 泛型约束与默认值
// 默认值
type Factory<T = boolean> = T | number | string;
// 约束
// A extends B 意味着 A 是 B 的子类型
type ResStatus<ResCode extends number = 1000> = ResCode extends 10000 | 10001 | 10002 ? 'success' : 'failure'
type Res1 = ResStatus<10001>; // "success"
type Res2 = ResStatus<20000>; // "failure"
// type Res3 = ResStatus<'10000'>; // 类型“string”不满足约束“number”。
// 给一个默认值
type Res4 = ResStatus; // "success"

// 多泛型关联
// Type 继承 Condition Type 需要符合 Condition 返回 TruthyResult 否则 FalsyResult
type Conditional<Type, Condition, TruthyResult, FalsyResult> = Type extends Condition ? TruthyResult : FalsyResult;

//  "passed!"
type Result1 = Conditional<'linbudu', string, 'passed!', 'rejected!'>;

// "rejected!"
type Result2 = Conditional<'linbudu', boolean, 'passed!', 'rejected!'>;

type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput
> = number;

// 对象类型中的泛型
interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}
interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}
interface IPaginationRes<TItem = unknown> {
  data: TItem[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}

async function fetchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfileRes>>> {
  const response = await fetch('/api/user-profiles');
  if (!response.ok) {
    throw new Error('Failed to fetch user profile list.');
  }
  const data = await response.json();
  return {
    code: 0,
    data,
  };
}

// 函数中的泛型
// 实现 对字符串,对数字,对对象进行操作的一个函数
// ❎
// function handle(input: string | number | {}): string | number | {} {
//   return input
// }
// ✅
function handle<T>(input: T): T {
  return input
}

function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

const swapped1 = swap(["linbudu", 599]); // [number, string]
const swapped2 = swap([null, 599]); // [number, null]
const swapped3 = swap([{ name: "linbudu" }, {}]); // [{}, {name: string}]

// 加入约束 
// T 只接受 string | number
function handleExtends<T extends string | number>(input: T): T {
  return input
}

function swapExtends<T extends number, U extends number>([start, end]: [T, U]): [U, T] {
  return [end, start];
}
// 例子: 函数的作用是选择一个对象 object 中的一些属性，并返回一个新对象，该对象只包含选定的属性
function pick<T extends object, U extends keyof T>(object: T, ...props: Array<U>):Pick<T, U>{
  const newObj: Partial<Pick<T,U>> = {}
  props.forEach(prop => {
    newObj[prop] = object[prop] 
  });
  return newObj as Pick<T,U>
}
// 箭头函数写法
const pickArrow = <T extends object, U extends keyof T>(object: T, ...props: Array<U>):Pick<T, U> => {
  const newObj: Partial<Pick<T,U>> = {}
  props.forEach(prop => {
    newObj[prop] = object[prop] 
  });
  return newObj as Pick<T,U>
}

// class中的泛型
class Queue<TElementType> {}
// 内置方法中的泛型
function p() {
  return new Promise<boolean>((resolve, reject) => {
    resolve(true);
  });
}
