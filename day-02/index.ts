interface Res {
  code: 10000 | 10001 | 50000;
  status: "success" | "failure";
  data: any;
}

declare let res: Res
// interface Tmp {
//   mixed: true | string | 599 | {} | (() => {}) | (1 | 2)
// }

// declare let x:Tmp

// interface Tmp {
//   user:
//     | {
//         vip: true;
//         expires: string;
//       }
//     | {
//         vip: false;
//         promotion: string;
//       };
// }

// declare var tmp: Tmp;

// if (tmp.user.vip) {
//   console.log(tmp.user.expires);
// }

type Code = 10000 | 10001 | 50000;

type Status = "success" | "failure";

interface Tmp {
  obj: {
    name: string
    age: number
  }
}

const tmp: Tmp = {
  obj: {
    name: 'lin',
    age: 0
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
