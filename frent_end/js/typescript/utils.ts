
interface CoustomDate {
	day: string | number,
	hour: string | number,
	minutes: string | number,
	second: string | number
}

class Utils {
	/**
	 * @param startTime  开始时间
	 * @param endTinme   结束时间
	 */
	static countDown(startTime:object | string, endTime: object | string): CoustomDate {
		if (typeof startTime == "string") {
			startTime = new Date(startTime);
		}
		if (typeof endTime == "string") {
			endTime = new Date(endTime);
		}
		const countTime:number = ( (<any> endTime) - (<any>startTime) ) / 1000 ;
		let day =Math.floor( countTime / 3600 / 24 );
		let hour =Math.floor(( countTime / 3600  ) % 24);
		let minutes = Math.floor( (countTime / 60 ) % 60 );
		let second = Math.floor( countTime  % 60 );
		return {
			day: day,
			hour: hour,
			minutes: minutes,
			second: second
		}
	}
	/**
	 * 
	 * @param date 时间对象
	 * @param accuracy  精确度 (日，或者分，秒)
	 */
	static timeStr(date: object, accuracy: string): string {
		if (typeof date != "object")
		{
			console.error("请传入一个时间对象");
		}
		let year:number = (<Date>date).getFullYear();
		let month:number= (<Date>date).getMonth() + 1;
		let day:number = (<Date>date).getDate();
		let hour = (<Date>date).getHours();
		let minutes = (<Date>date).getMinutes();
		let second = (<Date>date).getSeconds();
		if (accuracy == "day" || accuracy == "d") {
			return year+"-"+month+"-"+day;
		} else if ( accuracy == "second" || accuracy == "s" ) {
			return year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+second;
		} else {
			return year+"-"+month+"-"+day+" "+hour+":"+minutes;
		}
	}
	/**
	 * 
	 * @param data 
	 * @param type 
	 */
	static validate(data:string, type:string):boolean {
		if (typeof data != "string")
		{
			console.error("请传入string类型");
		}
		let regPhone:RegExp = /^1(3|4|5|7|8)\d{9}$/;
		let regCard:RegExp = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
		let regEmail:RegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		if (type == "phone" || type == "mobile") {
			if (regPhone.test(data)) {
				return true;
			}
		}else if(type == "card" || type == "id") {
			if (regCard.test(data)) {
				return true;
			}
		}else {
			if (regEmail.test(data)) {
				return true;
			}
		}
		return false;
	}
   
	// 保留小数，不去四舍五入
	static retain (dividend:number, divisor: number, number: number):number  {
		let side = 10 ** (number || 1);
		let res:number =  parseInt((dividend / divisor ) * side ) / side;//保留两位、三位小数 同理
		return res;
	} 

	

}	
