(function(d3, fc) {
    'use strict';

    var multiplier;
    var slidingWindow = fc.indicator.algorithm.calculator.slidingWindow();
    //var indicatorName;
    var bollinger;

    function windowSize(){
        
    }

    sc.menu.indicatorParameters = function(indicator) {
        if (indicator === bollinger) {
            slidingWindow.accumulator(function(values) {
                var avg = d3.mean(values);
                var stdDev = d3.deviation(values);
                return {
                    upper: avg + multiplier * stdDev,
                    average: avg,
                    lower: avg - multiplier * stdDev
                };
            });
        }
    };
})(d3, fc);