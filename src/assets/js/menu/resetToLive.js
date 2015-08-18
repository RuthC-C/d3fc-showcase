(function(d3, fc) {
    'use strict';

    sc.menu.resetToLive = function(standardDateDisplay, timeSeries) {
        timeSeries.xDomain(standardDateDisplay);
    };

})(d3, fc);