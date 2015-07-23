(function(d3, fc) {
    'use strict';

    fc.data.update = function() {

        var generator = fc.data.coinbase();

        var updateInterval = 3000;

        var updateChart = function(cb) {
            // update chart after specified interval
            setInterval(function() {
                update(cb);
            }, updateInterval);

            function update(cb) {
                var currentEndDate = generator.end();

                //var newEndDate = new Date(currentEndDate.setDate(currentEndDate.getDate() + 1));

                var newEndDate = new Date(currentEndDate.setHours(currentEndDate.getHours() + 1));

                generator.end(newEndDate);

                //var currentStartDate = generator.start();
                //if ()
                /*var currentGranularity = generator.granularity();
                var newGranularity = currentGranularity + 200;
                generator.granularity(newGranularity);*/

                generator(cb);
            }
        };

        //var time; //whether using mins/hours/day/moth/etc.



        d3.rebind(updateChart, generator, 'start', 'end', 'granularity');
        return updateChart;
    };

})(d3, fc);