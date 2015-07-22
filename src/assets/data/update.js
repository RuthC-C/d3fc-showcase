(function(d3, fc) {
    'use strict';

    fc.data.update = function() {

        var time;
        var generator = fc.data.coinbase();

        var updateInterval = 3000;

        var updateChart = function(cb) {
            // update chart after specified interval
            setInterval(function() {
                update(cb);
            }, updateInterval);

            function update(cb) {
                var currentEndDate = generator.end();
                var newEndDate = new Date(currentEndDate.setDate(currentEndDate.getDate() + 1));

                generator.end(newEndDate);

                generator(cb);
            }
        };

        d3.rebind(updateChart, generator, 'start', 'end', 'granularity');
        return updateChart;
    };

})(d3, fc);