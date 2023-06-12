// 上下文类型

// 函数签名
type CustomHandler = (name: string, age: number) => boolean;
const handler: CustomHandler = (arg1, arg2) => true;
const handler_1: CustomHandler = (arg1) => true; // 正常 - 参数可以多,不能少
// const handler_2: CustomHandler = (arg1,arg2,arg3) => true; // 报错

// declare let struct: {
//   handler: CustomHandler;
// };
// struct.handler = (name, age) => true

// 可进行嵌套的类型推导
declare let fnNest: (raw: number) => (input: string) => any;

// raw → number
// fnNest = (raw) => {
//   // input → string
//   return (input) => { };
// };

const arr_1: number[] = [];
const list: number[] = [1, 2, 3];

list.forEach((item) => arr_1.push(item));

function handlerFn(arg: string) {
  console.log(arg);
}

function useHandler(callback: (arg1: string, arg2: number) => void) {
  callback('lin', 599);
}
// 将更少参数的函数赋值给具有更多参数的函数类型
useHandler(handlerFn); // lin
