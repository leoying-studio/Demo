interface checkPeople {
	eat():void;
	run():string;
	drink():string;
	// _name:string;
	// _age:number;
	// _gender:string;
}
//  interface  的约束的属性默认都是公有的， 如果需要设置为私有，需要自己独立配置，而不去使用类实现接口

export {checkPeople};