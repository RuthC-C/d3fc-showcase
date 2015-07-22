(function(fc) {
    'use strict';

    fc.data.stream = function() {

        var time = null,
            day = null,
            month = null,
            year = null;
        var updateInterval = 3000;

        var stream = function(count) {
            count = count || 1;

            for (var i = 0; i < count; i++) {
                if (time < 24) {
                    time = time + Math.floor(Math.random() * 24);
                    if (time >= 24) {
                        time = 0 + Math.floor(Math.random() * 24);
                        if (day < 30) {
                            day = day++;
                        }if (day >= 30) {
                            day = 0;
                            if (month < 12) {
                                month = month++;
                            }if (month >= 12) {
                                month = 0;
                                year = year++;
                            }

                        }

                    }

                }else if (time >= 24) {
                    time = 0 + Math.floor(Math.random() * 24);
                }if (time >= 24) {
                    time = 0 + Math.floor(Math.random() * 24);
                    if (day < 30) {
                        day = day++;
                    }if (day >= 30) {
                        day = 0;
                        if (month < 12) {
                            month = month++;
                        }if (month >= 12) {
                            month = 0;
                            year = year++;
                        }

                    }

                }

            }

        };

        setInterval(function() {
            stream();
        }, updateInterval);

    };
    /* var generator = fc.data.coinbase().start(new Date(2014, 7, 21));
    var data = generator(20);

    // Create scale for x axis
    var dateScale = fc.scale.dateTime()
        .domain(fc.util.extent(data, 'date'))
        .range([0, width])
        .nice();

    // Create scale for y axis
    var priceScale = d3.scale.linear()
        .domain(fc.util.extent(data, ['high', 'low']))
        .range([height, 0])
        .nice();

    setInterval(function() {
        var datum;
        while (!datum) {
            datum = generator(1)[0];
        }
        data.push(datum);
        data.shift();
        data.forEach(function(d) {
            d.low = d.low - 0.1;
        });
        dateScale.domain(fc.util.extent(data, 'date'));
        priceScale.domain(fc.util.extent(data, ['high', 'low']));
        //render();
    }, 1000);
};*/
})(fc);