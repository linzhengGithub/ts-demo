# day-01: 原始类型与对象类型
```sh
npm i ts-node typescript -g
tsc --init
```

```sh
npm i ts-node-dev -g
```

## 名词
* declare
  
npm包 - tsd

* expectType（检查预期类型与表达式或变量的类型是否一致）
* expectNotType（检查预期类型与表达式或变量的类型是否不同）
* expectAssignable（检查表达式或变量的类型是否能赋值给预期类型）

## 拓展
### require extension
ts-node、require-ts （允许你去 require 一个 TS 文件）这些工具库的工作原理，它们的核心逻辑其实都是通过 require.extension 处理文件逻辑

## 原始类型的类型标注
### JavaScript的内置原始类型
number / string / boolean / null / undefined / symbol / bigint
#### null 与 undefined
在 JavaScript 中，null 与 undefined 分别表示“这里有值，但是个空值”和“这里没有值”。而在 TypeScript 中，null 与 undefined 类型都是有具体意义的类型
#### void
void 用于描述一个内部没有 return 语句，或者没有显式 return 一个值的函数的返回值
```ts
function func1() {}
function fun2() {
  return;
}
function func3() {
  return undefined;
}
```
void 表示一个空类型，而 null 与 undefined 都是一个具有意义的实际类型（注意与它们在 JavaScript 中的意义区分）
undefined 能够被赋值给 void 类型的变量，就像在 JavaScript 中一个没有返回值的函数会默认返回一个 undefined 。null 类型也可以。
```ts
const voidVar1: void = undefined;

const voidVar2: void = null; // 需要关闭 strictNullChecks
```
## 数组的类型标注
### 数组类型
```ts
const arr1: string[] = [];

const arr2: Array<string> = [];
```
以上两种等价关系，通常使用第一种
### 数组长度
#### 元组（Tuple）
用来`固定数据结构`，帮助我们进一步提升`数组结构的严谨性`
```ts
const arr5: [string, number, boolean] = ['red', 599, true];
const arr6: [string, number?, boolean?] = ['red']; // 必选项不能位于可选项后面
type TupleLength = typeof arr6.length; // 1 | 2 | 3
```
#### 具名元组
更好的可读性
```ts
const arr7: [name: string, age: number, male?: boolean] = ['red', 599, true];
```
## 对象的类型标注
### interface - 描述
这里的“描述”指：
* 每一个属性的值必须一一对应到接口的属性类型
* 不能有多的属性，也不能有少的属性，包括直接在对象内部声明，或是 obj1.xxx = 'xxx' 这样属性访问赋值的形式
```ts
interface Info {
  name: string
  age?: number
  male: boolean
}

const person:Info = {
  name: 'lin',
  age: 18,
  male: true
}
```

#### 可选（optional）与 只读（Readonly）
##### readonly
```ts
interface Info {
  readonly name: string
  age?: number
  male: boolean
}
```
### 数组类型和对象类型的区别
* 数组只能对整个元组进行修饰;对象则是可以标记某一个属性
```ts
const arr: readonly [name: string] = ['lin']

interface Info {
  readonly name: string
  age?: number
  male: boolean
}
```
* 一旦被标记为只读，那这个只读数组/元组的类型上，将不再具有 push、pop 等方法（即会修改原数组的方法）
  
  报错信息也将是类型 xxx 上不存在属性“push”这种

  读数组与只读元组的类型实际上变成了 `ReadonlyArray`，而不再是 `Array`

### type 与 interface
* type（Type Alias，类型别名）来代替接口结构描述对象
* interface 用来描述对象、类的结构

interface 用来描述对象、类的结构，而类型别名用来将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型

### object、Object 以及 { }
* Object
  
  包含了所有的类型

  和Object类似的还有 Boolean、Number、String、Symbol，这几个`装箱类型（Boxed Types）`

* object
  
  为了解决对 Object 类型的错误使用，它代表所有非原始类型的类型，即数组、对象与函数类型
* { }

  { } 作为类型签名就是一个合法的，但内部无属性定义的空对象

`装箱类型`:

以 String 为例，它同样包括 undefined、null、void，以及代表的 拆箱类型（Unboxed Types） string，但并不包括其他装箱类型对应的拆箱类型，如 boolean 与 基本对象类型

```ts
const tmp9: String = undefined;
const tmp10: String = null;
const tmp11: String = void 0;
const tmp12: String = 'lin';

// 以下不成立，因为不是字符串类型的拆箱类型
const tmp13: String = 599; // X
const tmp14: String = { name: 'lin' }; // X
const tmp15: String = () => {}; // X
const tmp16: String = []; // X
```
#### 总结
* 不要使用Object以及类似的装箱类型
* 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 `object`。推荐进一步区分，也就是使用 `Record<string, unknown> 或 Record<string, any> 表示对象`，`unknown[] 或 any[] 表示数组`，`(...args: any[]) => any表示函数`
* 不要使用{}。{}意味着任何非 null / undefined 的值，从这个层面上看，使用它和使用 any 一样恶劣
