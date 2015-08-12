function(d3, fc, sc){
    'use strict';
    
    sc.primarychart.feature.series = function() {

        var candlestick = fc.series.candlestick();
        var ohlc = fc.series.ohlc();
        var point = fc.series.point();
        var line = fc.series.line();
        var area = fc.series.area();
        
        var currentSeries = candlestick;

        function series(cb) {
            function changeSeries(seriesTypeString) {
                switch (seriesTypeString) {
                    case 'ohlc':
                        currentSeries = ohlc;
                        break;
                    case 'candlestick':
                        currentSeries = candlestick;
                        break;
                    case 'line':
                        currentSeries = line;
                        break;
                    case 'point':
                        currentSeries = point;
                        break;
                    case 'area':
                        currentSeries = area;
                        break;
                    default:
                        currentSeries = candlestick;
                        break;
                }
            multi.series([gridlines, ma, currentSeries, closeAxisAnnotation]);
            render();
            }

            d3.select('#series-buttons')
                .selectAll('.btn')
                .on('click', function() {
                    var seriesTypeString = d3.select(this)
                        .select('input')
                        .node()
                        .value;
                    changeSeries(seriesTypeString);
                });
        }

        

            series.candlestick = function() {
                if()
            }

            webSocket.close = function() {
            if (coinbaseSocket) {
                coinbaseSocket.close();
            }
            return webSocket;
        };
    }
    
}