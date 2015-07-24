(function(d3, fc) {
    'use strict';

    var width = 700;
    var height = 400;
    //var stream = fc.data.stream();

    var svg = d3.select('#chart-example')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var data = fc.data.coinbase()
        .start(new Date(2015, 2, 1))
        .end(new Date(2015, 7, 22))
        .granularity(100000);

    var render = function(error, data) {
        var chart = fc.chart.linearTimeSeries()
            .xDomain(fc.util.extent(data, 'date'))
            .yDomain(fc.util.extent(data, ['open', 'close']));

        var area = fc.series.area()
            .yValue(function(d) { return d.open; })
            .y0Value(chart.yDomain()[0]);

        var line = fc.series.line()
            .yValue(function(d) { return d.open; });

        var gridlines = fc.annotation.gridline()
            .yTicks(5)
            .xTicks(0);

        var multi = fc.series.multi()
            .series([gridlines, area, line]);


        chart.plotArea(multi);
        svg.datum(data)
            .call(chart);
    };

    data(render);

})(d3, fc);