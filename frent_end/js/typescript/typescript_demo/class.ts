
abstract class SuperClass {

	private _versions: number = 1.0;

	getVersions() {
		return this._versions;
	}

	protected exchangeSort(collections: Array<number | string>, orderBy: boolean = true): void {
		for (let i = 0; i < collections.length; i++) {
			for (let j = 0; j < i; j++) {
				let ascend = orderBy ? collections[j] > collections[i] : collections[j] < collections[i];
				if (ascend) {
					let el = collections[i];
					collections[i] = collections[j];
					collections[j] = el;
				}
			}
		}
	}

	abstract removeByIndexs<T>(collections: T[], indexs: number[]): T[];

	abstract removeByValues<T, U extends T>(collections: T[], values: Array<U>, key?: string): T[]

	abstract findIndexByAttr<T, U extends T>(collections: T[], key: string, item: U): number;
}

class Utils extends SuperClass {

	removeByIndexs<T>(collections: T[], indexs: number[]): T[] {
		this.exchangeSort(indexs);
		indexs.reverse();
		for (var i = 0; i < indexs.length; i++) {
			for (var j = 0; j < collections.length; j++) {
				if (j === indexs[i]) {
					collections.splice(j, 1);
					j--;
					break;
				}
			}
		}
		return [...collections];
	}

	removeByValues<T, U extends T>(collections: T[], values: Array<U>, key?: string): T[] {
		let list = [...collections];
		for (var i = 0; i < values.length; i++) {
			let value = typeof key !== 'undefined' ?  values[i][key] : values[i];
			for (var j = 0; j < list.length; j++) {
				let item = typeof key !== 'undefined' ? list[i][key] : list[i];
				if (value === item) {
					list.splice(j, 1);
					j--;
				}
			}
		}
		return list;
	}

	findIndexByAttr<T, U extends T>(collections: T[], key: string, item: U): number {
		for (let i = 0; i < collections.length; i++) {
			let object = collections[i];
			if (object[key] === item[key]) {
				return i
			}
		}
	}

	

	
}



interface testType {
	name: string;
	age: number;
}

interface testType2 {
	name: string;
	age: number
}


let util = new Utils();
let remaining = util.removeByIndexs<number>([1, 2, 3], [2]);
util.findIndexByAttr<testType, testType2>([{ name: 'zhangsan', age: 18 }, { name: 'zhangsan', age: 18 }], "", { name: 'ss', age: 18 });
let values = util.removeByValues<string, string>(['1','2','3'], ['1', '2']);
console.log(values);
