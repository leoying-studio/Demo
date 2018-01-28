define(['jquery'],function($){
	 return{
	 	index:0,
	 	switch:function(){
	 		var colors = [{'backgroundColor':"red"},{'backgroundColor':"blue"},{'backgroundColor':"orange"}];
	 		this.index ++;
	 		if (this.index >2) {
	 			this.index = 0;
	 		}
	 		$('body').css(colors[this.index]);
	 	}
	 }
});