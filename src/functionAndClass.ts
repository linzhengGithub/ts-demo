// 方式一 (推荐)
const foo1 = (name: string): number => {
  return name.length
}

// 方式二 (不推荐)
const foo2: (name: string) => number = (name) => {
  return name.length
}

// void - 两种形式都是表达 这个函数进行了返回操作,但没有返回实际的值
function bar1(): void {
  // 返回undefined
  return
}

function bar2(): undefined {
  // 返回undefined
  return
}

// rest参数
function restFoo1(arg1: string, ...rest: any[]) { }
function restFoo2(arg1: string, ...rest: [number, boolean]) { }

// 重载签名 Overload Signature
function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func(599); // number
const res2 = func(599, true); // string
const res3 = func(599, false); // number

// 异步函数、Generator 函数等类型签名

// Class
// - 类与类成员的类型签名: (构造函数、属性、方法和访问符（Accessor）)
// - 修饰符: ( public / private / protected / readonly )
// - static( 静态成员 ): ( '静态成员'挂载在函数体上,'实例成员'挂载在原型上,它只属于当前定义的这个类以及其子类 )
class Utils {
  public static identifier = "linbudu";

  public static makeUHappy() {
    Utils.studyWithU();
  }

  public static studyWithU() {
    console.log('utils');
    return 'abc'
  }
}

class sUtils extends Utils {

}

Utils.makeUHappy();
const abc = Utils.studyWithU()
const def = sUtils.studyWithU()

// 继承, 实现, 抽象类
// - 继承: class Derived(派生类) extends Base(基类) 
//  - 其中派生类存在一个覆盖的方法(override) ps:基类中必须有这个声明才能覆盖
class Base {
  baseFn() { }
}
class Derived extends Base {
  override baseFn() { }
}
// - 抽象类: 使用abstract关键字声明 (描述这个方法的入参形式和返回值类型) 使用implements做实现 ps: 和 ts 中的 interface 相似
abstract class AbsFoo {
  abstract absProp: string
  abstract get absGetter(): string
  abstract absMethod(name: string): string
}

class DericedFoo implements AbsFoo {
  absProp: string = 'lin'

  get absGetter() {
    return 'linz'
  }

  absMethod(name: string): string {
    return name
  }
}
//  -- interface --
interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string): string
}

class sonFoo implements FooStruct {
  absProp: string = "lin"

  get absGetter() {
    return "lin"
  }

  absMethod(name: string) {
    return name
  }
}

// SOLID原则
// S - 单一功能原则,一个类应该仅具有一种职责
// O - 开放封闭原则,一个类应该是可扩展但不可修改的
// L - 里式替换原则,一个派生类可以在程序的任何一处对其基类进行替换
// I - 接口分离原则,类的实现方应当只需要实现自己需要的那部分接口
// D - 依赖倒置原则
