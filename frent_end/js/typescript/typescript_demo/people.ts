import Person from './index';
import { checkPeople } from './interface';
// 接口
interface SortAttr {
	name: string,
	age: number,
	length?: number;
}
// 枚举
enum sex {
	'man' = '男',
	'woman' = '女'
}
// 泛型接口
interface shFN {
	<T>(d: Array<T>): Array<T>
}

class People extends Person implements checkPeople {

	private _id: string;
	private _address: string;

	constructor(name: string, age: number, gender: sex, id: string, address: string) {
		super(name, age, gender);
		this._address = address;
		this._id = id;
	}

	drink() {
		return 'string';
	}

	run() {
		return 'run';
	}

	sort(o: SortAttr[]) {
		o.map((a: SortAttr, b: number) => {
			return {
				name: a.name,
				age: a.age
			};
		});
	}

   // 简单泛型
	getData<T>(type: T): T {
		return type;
	}

	//  简单泛型
	getArrayData<T>(value: T): T[] {
		let arr:T[] = [];
		for (let i = 0; i < 100; i++) {
			arr.push(value);
		}
		return arr;
	}

	// 扩展泛型
	getCoustomData<T extends SortAttr>(type: T): T {
		let len = type.length;
		return type;
	}

	// 多个参数泛型
    setArr<T, U>(name: T, age: U):[T, U]{
		return [name, age]
	}

	// 泛型和方法的重载
	seArr<T, U>(name: T, age: U, address: string): Array<T>{
		return [name];
	}

}

const p = new People('张三', 24, sex.man, '421302', '湖北');
p.sort([{ name: "zhang", age: 18 }]);
p.setArr<string, number>('张三丰', 18);
let say = p.getData<string>("sayHello");
console.log(say);