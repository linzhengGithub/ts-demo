// 结构化类型系统 - 基于类型结构进行兼容性判断的结构化类型系统

// 标称类型系统 - 基于类型名来进行比较

// 类型的重要意义之一是限制了数据的可用操作与实际意义
export declare class TagProtector<T extends string> {
  protected __tag__: T;
}

export type Nominal<T, U extends string> = T & TagProtector<U>;

// export type CNY = Nominal<number, 'CNY'>;

// export type USD = Nominal<number, 'USD'>;

class CNY {
  private __tag!: void;
  constructor(public value: number) {}
}
class USD {
  private __tag!: void;
  constructor(public value: number) {}
}
