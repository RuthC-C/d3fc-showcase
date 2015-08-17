(function(d3, fc, sc) {
    'use strict';

    sc.menu.resetToLive = function(standardDateDisplay) {
        sc.timeSeries.xDomain(standardDateDisplay);
    };

})(d3, fc, sc);