// 内置类型: any never 类型断言

// any - 无拘无束的“任意类型”，它能兼容所有类型，也能够被所有类型兼容

// 被标记为 any 类型的变量可以拥有任意类型的值
const anyName: any = 0

let stringName: string = 'linzheng'
// 标记为具体类型的变量也可以接受任何 any 类型的值
stringName = anyName

// 禁止滥用any 以下tips可以考虑
// 1. 使用断言
// 2. 未知类型,更合理的方式是使用unknown


// never - 整个类型系统层级中最底层的类型(Bottom Type)
// 1. never类型 是一个不携带任何的类型信息 是不会出现的类型
declare let v1: never
declare let v2: any
declare let v3: void
v2 = v1
v2 = v3
// 2. 可以让它只负责抛出错误的函数类型 (如果这个never类型函数被调用那之后的代码就不会继续执行 如同return)
function justThrow(): never {
  throw new Error()
}

// 类型断言 - 能够显式告知类型检查程序当前这个变量的类型，可以进行类型分析地修正、类型

interface IFoo {
  name: string;
}

declare const obj: {
  foo: IFoo
}

// const {
//   foo = {} as IFoo
// } = obj

// 更严谨的话 
// 使用 Partial 类型即 IFoo 的属性均为可选
const {
  foo = {} as Partial<IFoo>
} = obj

// 除了 as 的写法外可以使用 <> 语法 ps:因 TSX 中 <> 不好被分析出来可以使用 TypeScript ESLint 提供的 consistent-type-assertions 规则来约束断言风格

// 双重断言 - 因断言类型和元类型的差异过大,需要先断言到一个通用的类，即 any / unknown
const str: string = 'xxxx';

(str as unknown as { handler: () => {} }).handler();

// 使用尖括号断言
(<{ handler: () => {} }>(<unknown>str)).handler();

// 非空断言

declare const bar: {
  func?: () => ({
    prop?: number | null;
  })
};

// bar.func().prop.toFixed();    ❎
// bar.func!().prop!.toFixed();  ✅
// bar.func?.().prop?.toFixed(); ✅

// 常见场景
const element = document.querySelector("#id")!
const target = [1, 2, 3, 599].find(item => item === 599)!

// 可以通过 non-nullable-type-assertion-style 规则来检查代码中是否存在类型断言能够被简写为非空断言的情况

interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}

// const interfaceObj: IStruct = {};  ❎
// ✅ 这种写法仍然会给你 类型提示  - 以下 <> 和 as 断言的2中写法
const interfaceObj = <IStruct> {
  bar: {
    baz: {},
  },
}
// const interfaceObj = {
//   bar: {
//     baz: {},
//   },
// } as IStruct
