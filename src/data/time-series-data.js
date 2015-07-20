(function(fc) {
	'use strict';
	//push data to chart
	
	var 	product = 'BTS-USD',
			start = null, 
			end = null,
			error;
			//granularity=null; 
			
	var params = [];
		if (start != null) {
			params.push('start=' + start.toISOString());
		}
		if (end != null) {
			params.push('end=' + end.toISOString());
		}
		/*if (granularity != null) {
			params.push('granularity=' + granularity);
        }*/
		
	var coinbase = function(cb){	
			
			var url = 'https://api.exchange.coinbase.com/products/' + product + '/candles?' + fc.data.interface.params.join('&');
			d3.json(url, function(error, data) {
				if (error) {
					cb(error);
					return;
				}
			});
			
			var data = data.map(function(d) {
				return {
					date:new Date(d[0] * 1000),
					open:d[3],
					high:d[2],
					low:d[1],
					close:d[4],
					volume:d[5]
				};
			});
			cb(error, data);
		};	
		
		
	fc.dataGenerator.product = function(x) {
		if (!arguments.length) {
			return product;
		}
		product = x;
		return coinbase;
	};
	
	fc.dataGenerator.start = function(x) {
		if (!arguments.length) {
			return start;
		}
		start = x;
		return coinbase;
	};
	
	fc.dataGenerator.end = function(x) {
		if (!arguments.length) {
			return end;
		}
		end = x;
		return coinbase;
	};
	/*
	fc.dataGenerator.granularity = function(x){
		if(!arguments.length) {
			return granularity;
		}
		granularity = x;
		return coinbase;
	}*/
	return coinbase;
}(fc));