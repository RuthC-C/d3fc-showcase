(function(d3, fc) {
    'use strict';

    sc.menu.changeSeries = function() {

        var candlestick = fc.series.candlestick(),
            ohlc = fc.series.ohlc(),
            point = fc.series.point(),
            line = fc.series.line(),
            area = fc.series.area(),
            multi = fc.series.multi(),
            gridlines = sc.gridlines(),
            closeAxisAnnotation = sc.closeAxisAnnotation(),
            //render = sc.render(),
            currentSeries = candlestick;

        var changeSeries = function() {

            function selectSeries(seriesTypeString) {
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
                return multi.series([gridlines, currentSeries, closeAxisAnnotation]);
            }

            d3.select('#series-buttons')
                .selectAll('.btn')
                .on('click', function() {
                var seriesTypeString = d3.select(this)
                    .select('input')
                    .node()
                    .value;
                selectSeries(seriesTypeString);
            });

        };

        return changeSeries;

    };
})(d3, fc);
