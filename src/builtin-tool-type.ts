// 内置工具类型

// 属性修饰工具类型 - 对属性的修饰，包括对象属性和数组元素的可选/必选、只读/可写
type Partial_1<T> = {
  [P in keyof T]?: T[P];
};

// -? 让可选为必选(删除可选) 反之 +? 添加可选
type Required_1<T> = {
  [P in keyof T]-?: T[P];
};

type Required_2<T> = {
  [P in keyof T]+?: T[P];
};

type Readonly_1<T> = {
  readonly [P in keyof T]: T[P];
};

// 与-?/+?同理
type Readonly_2<T> = {
  +readonly [P in keyof T]: T[P];
};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// 结构工具类型 - 对既有类型的裁剪、拼接、转换等
// 比如使用对一个对象类型裁剪得到一个新的对象类型，将联合类型结构转换到交叉类型结构

// 结构声明
type Record_1<K extends keyof any, T> = {
  [P in K]: T;
};
// 键名均为字符串，键值类型未知
type Record1 = Record_1<string, unknown>;
// 键名均为字符串，键值类型任意
type Record2 = Record_1<string, any>;
// 键名为字符串或数字，键值类型任意
type Record3 = Record_1<string | number, any>;
// 字典结构
type Dictionary<T> = {
  [index: string]: T;
};
type NumericDictionary<T> = {
  [index: number]: T;
};

const dic: Dictionary<string> = {
  name: '321',
  age: '321'
}

const dic1: NumericDictionary<string> = {
  1: 'one',
  3: 'three'
}

// T 是一个泛型类型参数，它表示一个对象的类型。我们可以使用这个参数来表示任意类型的对象。
// K 是一个泛型类型参数，并且有一个约束条件 K extends keyof T。这表示 K 必须是 T 的键（属性）的类型。
// P 是一个临时变量，它在映射类型中使用。在这个代码中，我们使用 P in K 来遍历 K 中的每个属性。
// T[P] 是T的key值即对应的类型
type _Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface Foo {
  name: string
  age: number
  address: string
}

type PickedFoo = _Pick<Foo, 'address'>

// 结构处理


