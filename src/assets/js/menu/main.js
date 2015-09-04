(function(d3, fc, sc) {
    'use strict';

    sc.menu.main = function() {

        var movingAverage = fc.series.line()
            .decorate(function(select) {
                select.enter()
                    .classed('movingAverage', true);
            })
            .yValue(function(d) { return d.movingAverage; });

        var noIndicator = sc.menu.option('None', 'no-indicator', null);
        var movingAverageIndicator = sc.menu.option('Moving Average', 'movingAverage', movingAverage);
        var bollingerIndicator = sc.menu.option('Bollinger Bands', 'bollinger', fc.indicator.renderer.bollingerBands());
        var indicators = [noIndicator, movingAverageIndicator, bollingerIndicator];
        var indicatorsNoNone = [movingAverageIndicator, bollingerIndicator];

        var dispatch = d3.dispatch('primaryChartSeriesChange',
            'primaryChartIndicatorChange',
            'secondaryChartChange',
            'dataTypeChange',
            'periodChange',
            'windowSizeChanged');

        function setPeriodChangeVisibility(visible) {
            var visibility = visible ? 'visible' : 'hidden';
            d3.select('#period-selection')
                .style('visibility', visibility);
        }

        setPeriodChangeVisibility(false);

        var primaryChartSeriesOptions = sc.menu.primaryChart.series()
            .on('primaryChartSeriesChange', function(series) {
                dispatch.primaryChartSeriesChange(series);
            });

        var primaryChartIndicatorOptions = sc.menu.primaryChart.indicators()
            .indicators(indicators)
            .on('primaryChartIndicatorChange', function(indicator) {
                dispatch.primaryChartIndicatorChange(indicator);
            });

        var secondaryChartOptions = sc.menu.secondaryChart.chart()
            .on('secondaryChartChange', function(chart) {
                dispatch.secondaryChartChange(chart);
            });

        var dataTypeChangeOptions = function(selection) {
            selection.on('change', function() {
                if (this.value === 'bitcoin') {
                    setPeriodChangeVisibility(true);
                } else {
                    setPeriodChangeVisibility(false);
                }
                dispatch.dataTypeChange(this.value);
            });
        };

        var periodChangeOptions = function(selection) {
            selection.on('change', function() {
                dispatch.periodChange(this.value);
            });
        };

        var changeWindowSize = sc.menu.indicatorWindowSize()
            .indicators(indicatorsNoNone)
            .on('windowSizeChanged', function(windowSize) {
                dispatch.windowSizeChanged(windowSize);
            });

        var main = function(selection) {
            selection.each(function() {
                var selection = d3.select(this);
                selection.select('#type-selection')
                    .call(dataTypeChangeOptions);
                selection.select('#period-selection')
                    .call(periodChangeOptions);
                selection.select('#series-buttons')
                    .call(primaryChartSeriesOptions);
                selection.select('#indicator-buttons')
                    .call(primaryChartIndicatorOptions);
                selection.select('#secondary-chart-buttons')
                    .call(secondaryChartOptions);
                selection.select('#indicator-window-size')
                    .call(changeWindowSize);
            });
        };

        return d3.rebind(main, dispatch, 'on');
    };
})(d3, fc, sc);