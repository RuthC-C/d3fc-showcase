
(function(d3, fc) {
    'use strict';
	
	fc.data.interface = function(){
			var 	start = null, 
					end = null; 
			
			var params = [];
				if (start != null) {
					params.push('start=' + start.toISOString());
				}
				if (end != null) {
					params.push('end=' + end.toISOString());
				}
	};


}(d3, fc));

