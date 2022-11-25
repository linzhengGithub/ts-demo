# day-02: 字面量类型

## 字面量类型与联合类型
### 字面量类型
  
  它代表着比原始类型更精确的类型,其包括：`字符串字面量类型`、`数字字面量类型`、`布尔字面量类型`和`对象字面量类型`
```ts
interface Res {
  code: 10000 | 10001 | 50000;
  status: "success" | "failure";
  data: any;
}
```
### 联合类型

  它代表了一组类型的可用集合

  注意：
  
  * 对于联合类型中的函数类型，需要使用括号`()`包裹起来
  * 函数类型并不存在字面量类型，因此这里的 `(() => {})` 就是一个合法的函数类型
  * 你可以在联合类型中进一步嵌套联合类型，但这些嵌套的联合类型最终都会被展平到第一级中
```ts
interface Tmp {
  mixed: true | string | 599 | {} | (() => {}) | (1 | 2)
}
```
<strong>联合类型的常用场景</strong>

通过多个对象类型的联合，来实现手动的互斥属性，即这一属性如果有字段1，那就没有字段2:
```ts
interface Tmp {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

declare var tmp: Tmp;

if (tmp.user.vip) {
  console.log(tmp.user.expires);
}
```

  使用类型别名复用一组字面量联合类型
  ```ts
  type Code = 10000 | 10001 | 50000;

  type Status = "success" | "failure";
  ```

### 对象字面量类型
```ts
interface Tmp1 {
  obj: {
    name: string
    age: number
  }
}

const tmp1: Tmp1 = {
  obj: {
    name: 'lin',
    age: 18
  }
}

interface Tmp2 {
  obj: {
    name: 'lin'
    age: 18
  }
}

const tmp2: Tmp2 = {
  obj: {
    name: 'lin',
    age: 18
  }
}

```
### 总结
需要更精确类型的情况下，可以使用字面量类型加上联合类型的方式，将类型从 string 这种宽泛的原始类型直接收窄到 "resolved" | "pending" | "rejected" 这种精确的字面量类型集合

`注意`<strong>无论是原始类型还是对象类型的字面量类型，它们的本质都是类型而不是值</strong>
