(function(sc) {
    'use strict';
    // Helper functions
    function calculateCloseAxisTagPath(width, height) {
        var h2 = height / 2;
        return [
            [0, 0],
            [h2, -h2],
            [width, -h2],
            [width, h2],
            [h2, h2],
            [0, 0]
        ];
    }

    function positionCloseAxis(sel) {
        sel.enter()
            .select('.right-handle')
            .insert('path', ':first-child')
            .attr('transform', 'translate(' + -40 + ', 0)')
            .attr('d', d3.svg.area()(calculateCloseAxisTagPath(40, 14)));

        sel.select('text')
            .attr('transform', 'translate(' + (-2) + ', ' + 2 + ')')
            .attr('x', 0)
            .attr('y', 0);
    }

    sc.chart.primaryChart = function() {
        var dispatch = d3.dispatch('viewChange');

        var timeSeries = fc.chart.linearTimeSeries()
            .xTicks(6);

        var gridlines = fc.annotation.gridline()
            .yTicks(5)
            .xTicks(0);


        // Create and apply the Moving Average
        var movingAverage = fc.indicator.algorithm.movingAverage()
            .value(function(d) { return d.close; });

        var bollingerAlgorithm = fc.indicator.algorithm.bollingerBands();

        /*d3.select('windowSize').on('input', function() {
            update(+this.value);
        });

        function update() {
            d3.select('#windowSize-value').text(windowSize);
            d3.select('#windowSize').property('value', windowSize);

            movingAverage.windowSize(windowSize);
            bollingerAlgorithm.windowSize(windowSize);
        }*/

        var priceFormat = d3.format('.2f');

        var closeAxisAnnotation = fc.annotation.line()
            .orient('horizontal')
            .value(function(d) { return d.close; })
            .label(function(d) { return priceFormat(d.close); })
            .decorate(function(sel) {
                positionCloseAxis(sel);
                sel.enter().classed('close', true);
            });

        var multi = fc.series.multi()
            .series([gridlines, closeAxisAnnotation])
            .key(function(series, index) {
                if (series.isLine) {
                    return index;
                }
                return series;
            });

        function primaryChart(selection) {
            var data = selection.datum().data;
            var viewDomain = selection.datum().viewDomain;
            timeSeries.xDomain(viewDomain);

            movingAverage(data);
            bollingerAlgorithm(data);

            multi.mapping(function(series) {
                switch (series) {
                    case closeAxisAnnotation:
                        return [data[data.length - 1]];
                    default:
                        return data;
                }
            });

            // Scale y axis
            var yExtent = fc.util.extent(sc.util.filterDataInDateRange(data, timeSeries.xDomain()), ['low', 'high']);
            timeSeries.yDomain(yExtent);

            // Redraw
            timeSeries.plotArea(multi);
            selection.call(timeSeries);

            // Behaves oddly if not reinitialized every render
            var zoom = d3.behavior.zoom();
            zoom.x(timeSeries.xScale())
                .on('zoom', function() {
                    sc.util.zoomControl(zoom, selection, data, timeSeries.xScale());
                    dispatch.viewChange(timeSeries.xDomain());
                });

            selection.call(zoom);
        }

        d3.rebind(primaryChart, dispatch, 'on');

        primaryChart.changeSeries = function(series, indicator) {
            if (indicator == null) {
                multi.series([gridlines, series, closeAxisAnnotation]);
            } else {
                multi.series([gridlines, indicator, series, closeAxisAnnotation]);
            }
            return primaryChart;
        };

        primaryChart.changeIndicator = function(indicator, series) {
            if (indicator == null) {
                multi.series([gridlines, series, closeAxisAnnotation]);
            } else {
                multi.series([gridlines, indicator, series, closeAxisAnnotation]);
            }
            return primaryChart;

        };

        primaryChart.changeWindowSize = function(value, indicator) {
            if (indicator != null) {
                movingAverage.windowSize(value);
                bollingerAlgorithm.windowSize(value);
            }
            return primaryChart;
        };

        /*primaryChart.changeAccumulator = function(value, indicator) {
            if (indicator === bollinger) {

            } else {
                if (indicator === movingAverage) {

                }
            }
        };*/

        return primaryChart;
    };
})(sc);