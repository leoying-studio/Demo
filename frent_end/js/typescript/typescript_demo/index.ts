class Person {
	private _name: string;
	private _age: number;
	private _gender: string;

	constructor(name: string, age:number, gender:string) {
		this._age = age;
		this._name = name;
		this._gender = gender;
	};

	public eat():void {
		console.log(this._age);
	}

	// public run():string {
	// 	return 'run';
	// }

}

export default Person;