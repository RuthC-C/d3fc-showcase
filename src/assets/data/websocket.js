(function(fc) {
    'use strict';

    fc.data.websocket = function() {

        var websocket = function(cb) {
            var coinbaseSocket = new WebSocket('wss://ws-feed.exchange.coinbase.com');
            var data = [];

            var msg = {
                type: 'subscribe',
                product_id: 'BTC-USD'
            };

            coinbaseSocket.onopen = function() {
                // Send the msg object as a JSON-formatted string.
                coinbaseSocket.send(JSON.stringify(msg));
            };

            coinbaseSocket.onmessage = function(event) {
                var jMsg = JSON.parse(event.data);
                jMsg.high = parseFloat(jMsg.price + Math.floor(Math.random() * 5));
                jMsg.open = parseFloat(jMsg.price);
                jMsg.close = jMsg.price - Math.floor(Math.random() * 5);
                jMsg.low = jMsg.close - Math.floor(Math.random() * 5);
                jMsg.date = new Date(jMsg.time);
                jMsg.volume = parseFloat(jMsg.size);


                if (jMsg.type === 'received' && jMsg.size > 1) {
                    data.push(jMsg);
                    console.log(jMsg);
                    cb(null, data);
                    return jMsg;
                } else {
                    return;
                }
                
            };

        };
        return websocket;
    };

})(fc);
