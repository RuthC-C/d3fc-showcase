(function(sc) {
    'use strict';

    sc.menu.resetToLive = function(dataModel, svgNav, onViewChanged) {

        // Using golden ratio to make initial display area rectangle into the golden rectangle
        var goldenRatio = 1.618;
        var navAspect = parseInt(svgNav.style('height'), 10) / svgNav.attr('width');
        var data = dataModel.data;
        var standardDateDisplay = [data[Math.floor((1 - navAspect * goldenRatio) * data.length)].date,
            data[data.length - 1].date];
        onViewChanged(standardDateDisplay);

    };

})(sc);