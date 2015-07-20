(function(fc) {
	'use strict';
	
	fc.data.stream = function() {
		var datastream = new fc.data.interface();
		
		var 	product = 'BTC-USD',
				start = datastream.start,
				end = datastream.end,
				
		
			
			var dataGenerator = function(dg){
				
				var 	randomData = Math.random()*500,
						openData = randomData + Math.random()*50,
						closeData = randomData - Math.random()*50,
						highData = highData + Math.random()*50,
						lowData = lowData - Math.random()*50;
				
				
				data = data.map(function(d) {
					return {
						open: openData,
						high: highData,
						low: lowData,
						close: closeData
					};
				});
				
			};
			
			
	
	
		dataGenerator.product = function(x) {
			if (!arguments.length) {
				return product;
			}
			product = x;
			return coinbase;
		};
		
		dataGenerator.start = function(x) {
			if (!arguments.length) {
				return start;
			}
			start = x;
			return coinbase;
		};
		
		dataGenerator.end = function(x) {
			if (!arguments.length) {
				return granularity;
			}
			granularity = x;
			return coinbase;
		};
		
		dataGenerator.granularity = function(x) {
			if (!arguments.length) {
				return granularity;
			}
			granularity = x;
			return coinbase;
		};
		
		return coinbase;
	};	
	
}(fc));








