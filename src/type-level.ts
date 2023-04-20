// 类型系统层级

// a extends b => 如果成立说明 a 是 b 的子类型

// 联合类型
type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2; // 1
type Result8 = 'lin' extends 'lin' | 'bu' | 'du' ? 1 : 2; // 1
type Result9 = true extends true | false ? 1 : 2; // 1

type Result10 = string extends string | false | number ? 1 : 2; // 1
type Result11 = 'lin' | 'bu' | 'budu' extends string ? 1 : 2; // 1
type Result12 = {} | (() => void) | [] extends object ? 1 : 2; // 1

// 结论: 字面量类型 < 包含此字面量类型的联合类型（同一基础类型） < 对应的原始类型
// 即:
type Result13 = 'linbudu' extends 'linbudu' | '599'
  ? 'linbudu' | '599' extends string
    ? 2
    : 1
  : 0; // 2

// 装箱类型: 如String,Boolean,Number
// 从类型信息层面出发: 原始类型 < 原始类型对应的装箱类型 < Object 类型

// Top Type - any 和 unknown
type Result22 = Object extends any ? 1 : 2; // 1
type Result23 = Object extends unknown ? 1 : 2; // 1

type Result24 = any extends Object ? 1 : 2; // 1 | 2
type Result25 = unknown extends Object ? 1 : 2; // 2

type Result31 = any extends unknown ? 1 : 2;  // 1
type Result32 = unknown extends any ? 1 : 2;  // 1
// 结论: Object < any / unknown

// Bottom Type - never
type Result33 = never extends 'linbudu' ? 1 : 2; // 1
type Result34 = undefined extends 'linbudu' ? 1 : 2; // 2
type Result35 = null extends 'linbudu' ? 1 : 2; // 2
type Result36 = void extends 'linbudu' ? 1 : 2; // 2
// 结论: never < 字面量类型

// 类型层级链
