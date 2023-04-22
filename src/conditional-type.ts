// 类型里的逻辑运算

// ValueA === ValueB ? Result1 : Result2;
// TypeA extends TypeB ? Result1 : Result2;

// infer -> inference
type Func = (...args: any[]) => any;

type FunctionReturnType<T extends Func> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

const myFunction: Func = (...args) => {
  console.log(args);
};


myFunction(1, 2, 3); // 输出 [1, 2, 3]
myFunction('hello', { foo: 'bar' }); // 输出 ['hello', { foo: 'bar' }]

