function type1 () {
  interface Tmp {
    obj: {
      name: "linbudu",
      age: 18
    }
  }
  
  const tmp: Tmp = {
    obj: {
      name: "linbudu",
      age: 18
    }
  }
  console.log(tmp);
}

type1()

const returnNum = () => 100 + 499;

enum Items {
  Foo = returnNum(),
  Bar = 600,
  Baz
}

console.log(Items.Baz);

