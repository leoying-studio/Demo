import Person from './index';
import {checkPeople} from './interface';

class People extends Person implements checkPeople{

	private _id:string;
	private _address:string;

	constructor(name: string, age:number, gender:string, id:string, address) {
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
	
}