(function(d3, fc) {
    'use strict';

    sc.menu.indicatorWindowSize = function() {

        var dispatch = d3.dispatch('windowSizeChanged');
        var windowValue = 10;
        var indicators;

        function indicatorPeriodLength(sel) {
            var label = sel.selectAll('label')
                .data(sel.datum())
                .enter()
                .append('label')
                .text(function(d, i) { return d.displayString + ' Period Length'; });
            label.append('input')
                .attr({
                    type: 'range',
                    min: 1,
                    max: 100,
                    value: function(d, i) { return d.valueString; },
                    id: 'window-slider'
                })
                .property('value', windowValue);
            label.append('input')
                .attr({
                    type: 'number',
                    min: 1,
                    max: 100,
                    value: function(d, i) { return d.valueString; },
                    id: 'window-number'
                })
                .property('value', windowValue);
        }

        function indicatorWindowSize(selection) {
            selection.datum(indicators)
                .call(indicatorPeriodLength);

            selection.selectAll('input')
                .on('input', function() {
                    windowValue = +this.value;
                    d3.select('#window-slider')
                        .property('value', windowValue);
                    d3.select('#window-number')
                        .property('value', windowValue);
                    dispatch.windowSizeChanged(windowValue);
                });
        }

        d3.rebind(indicatorWindowSize, dispatch, 'on');

        indicatorWindowSize.indicators = function(x) {
            if (!arguments.length) {
                return indicators;
            }
            indicators = x;
            return indicatorWindowSize;
        };


        return indicatorWindowSize;
    };

})(d3, fc);