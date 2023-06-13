// 协变与逆变的比较

// 如果一个值能够被赋值给某个类型的变量，那么可以认为这个值的类型为此变量类型的子类型
// 他可以接收子类型,但是不能接受父类型
// Animal -> Dog; Dog -> Corgi
class Animal { }
class Dog extends Animal {
  bark() { }
}
class Corgi extends Dog { }
function makeDogBark(dog: Dog) {
  dog.bark()
}
// 里氏替换原则：子类可以扩展父类的功能，但不能改变父类原有的功能，子类型（subtype）必须能够替换掉他们的基类型（base type）
// 参数类型允许为 Dog 的父类型，不允许为 Dog 的子类型。
// 返回值类型允许为 Dog 的子类型，不允许为 Dog 的父类型。
makeDogBark(new Corgi()) // 正常
// makeDogBark(new Animal()) // 错误

// 协变与逆变: 最初来自于几何学领域中：随着某一个量的变化，随之变化一致的即称为协变，而变化相反的即称为逆变
// strictFunctionTypes: tsconfig.json 文件中配置(接收逆变和协变,简称双变)
