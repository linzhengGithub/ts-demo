// 函数默认传参ts写法·
interface ObjType {
  name?: string,
  age?: number,
  address: string
}
const fn = ({ name = 'lin', age = 18, address }: ObjType) => {
  return name + age + address
}
fn({ address: 'wen' })
