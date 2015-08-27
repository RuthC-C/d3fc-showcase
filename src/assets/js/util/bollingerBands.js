(function(d3, fc) {
    'use strict';

    sc.util.bollingerBands = function() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            yValue = function(d, i) { return d.close; },
            xValue = function(d, i) { return d.date; },
            root = function(d) { return d.bollingerBands; };

        var area = fc.series.area()
            .y0Value(function(d, i) {
                return root(d).upper;
            })
            .y1Value(function(d, i) {
                return root(d).lower;
            });

        var upperLine = fc.series.line()
            .yValue(function(d, i) {
                return root(d).upper;
            });

        var lowerLine = fc.series.line()
            .yValue(function(d, i) {
                return root(d).lower;
            });

        var bollingerBands = function(selection) {

            var multi = fc.series.multi()
                .xScale(xScale)
                .yScale(yScale)
                .series([area, upperLine, lowerLine])
                .decorate(function(g) {
                    g.enter()
                        .attr('class', function(d, i) {
                            return 'multi ' + ['area', 'upper', 'lower'][i];
                        });
                });

            area.xValue(xValue);
            upperLine.xValue(xValue);
            lowerLine.xValue(xValue);

            selection.call(multi);
        };

        bollingerBands.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return bollingerBands;
        };
        bollingerBands.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return bollingerBands;
        };
        bollingerBands.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return bollingerBands;
        };
        bollingerBands.yValue = function(x) {
            if (!arguments.length) {
                return yValue;
            }
            yValue = x;
            return bollingerBands;
        };
        bollingerBands.root = function(x) {
            if (!arguments.length) {
                return root;
            }
            root = x;
            return bollingerBands;
        };

        return bollingerBands;
    };
}(d3, fc));