(function(d3, fc, sc) {
    'use strict';
    
    var multiplier;
    var slidingWindow = fc.indicator.algorithm.calculator.slidingWindow();
    var indicatorName;
    
    
    sc.menu.indicatorParameters = function(indicator) {
        slidingWindow.accumulator(function(d) { return d.close; });
    }
})(d3, fc, sc);