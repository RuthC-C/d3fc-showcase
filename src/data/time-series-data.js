(function(fc) {
	'use strict';
	
	var 	product = 'BTS-USD',
			start = null, 
			end = null; 
			
	var params = [];
		if (start != null) {
			params.push('start=' + start.toISOString());
		}
		if (end != null) {
			params.push('end=' + end.toISOString());
		}
		
		var coinbase = function(cb){	
				
				var url = 'https://api.exchange.coinbase.com/products/' + product + '/candles?' + fc.data.interface.params.join('&');
				d3.json(url, function(error, data) {
					if (error) {
						cb(error);
						return;
					}
				});
				
				data = data.map(function(d) {
					return {
						date: new Date(d[0] * 1000),
						open: d[3],
						high: d[2],
						low: d[1],
						close: d[4],
						volume: d[5]
					};
				});
				cb(error, data);
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
		
		
		return coinbase;
	};	
		
				
	
});