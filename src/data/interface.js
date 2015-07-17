
(function(d3, fc) {
    'use strict';
	
	fc .data.interface = function(){
			var 	start = null, 
			end = null, 
			granularity = null;
			
			var params = [];
				if (start != null) {
					params.push("start=" + start.toISOString());
				}
				if (end != null) {
					params.push("end=" + end.toISOString());
				}
				if (granularity != null) {
					params.push("granularity=" + granularity.toISOString());
				}
	};

   
			
			

}(d3, fc));



/*
(function(d3, fc){
	'use strict';
	
	fc.data.dataInterface
		
		
	var params = [];
	if (start != null){
		params.push('start=' + start.toString());
	}
	if (end != null) {
		params.push('end=' + end.toString());
	}
})
*/