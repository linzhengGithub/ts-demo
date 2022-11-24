

const arr1: string[] = [];

const arr2: Array<string> = [];
const arr4: [string, string, string] = ['lin', 'bu', 'du'];

// console.log(arr4[599]);
const arr5: [string, number, boolean] = ['linbudu', 599, true];
const arr6: readonly [string, number?, boolean?] = ['linbudu', , ,];
type TupleLength = typeof arr6.length

const arr7: [name: string, age?: number, male?: boolean] = ['linbudu', 599, true];

const arr10: [string?, string?, string?] = []

interface Info {
  name: string
  age?: number
  male: boolean
}

const person:Info = {
  name: 'lin',
  male: true
}

person.male = false
console.log(person.male);

const arr: readonly [name: string] = ['lin']
