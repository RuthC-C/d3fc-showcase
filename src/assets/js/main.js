(function(d3, fc, sc) {
    'use strict';

    // Set SVGs & column padding
    var container = d3.select('#chart-example');

    var svgMain = container.select('svg.primary');
    var svgRSI = container.select('svg.rsi');
    var svgNav = container.select('svg.nav');

    var candlestick = fc.series.candlestick();
    var ohlc = fc.series.ohlc();
    var point = fc.series.point();
    var line = fc.series.line();
    line.isLine = true;
    var area = fc.series.area();

    var dataModel = {
        data: fc.data.random.financial()(250),
        viewDomain: []
    };

    sc.util.calculateDimensions(container);

    var primaryChart = sc.chart.primaryChart();
    var rsiChart = sc.chart.rsiChart();
    var navChart = sc.chart.navChart();
    var resetToLive = sc.menu.resetToLive();

    function onViewChanged(domain) {
        dataModel.viewDomain = [domain[0], domain[1]];
        render();
    }

    primaryChart.on('viewChange', onViewChanged);
    rsiChart.on('viewChange', onViewChanged);
    navChart.on('viewChange', onViewChanged);

    function changeSeries(seriesTypeString) {
        var currentSeries;
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
        primaryChart.changeSeries(currentSeries);
    }

    changeSeries('candlestick');

    d3.select('#series-buttons')
        .selectAll('.btn')
        .on('click', function() {
            var seriesTypeString = d3.select(this)
                .select('input')
                .node()
                .value;
            changeSeries(seriesTypeString);
            render();
        });

    container.select('#reset-button').on('click', function() {
        resetToLive(dataModel, svgNav, onViewChanged);
        render();
    });

    function render() {
        svgMain.datum(dataModel)
            .call(primaryChart);

        svgRSI.datum(dataModel)
            .call(rsiChart);

        svgNav.datum(dataModel)
            .call(navChart);
    }

    function resize() {
        sc.util.calculateDimensions(container);
        render();
    }

    d3.select(window).on('resize', resize);

    resetToLive(dataModel, svgNav, onViewChanged);
    resize();

})(d3, fc, sc);