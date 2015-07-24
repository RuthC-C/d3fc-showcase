(function(fc) {
    'use strict';

    fc.data.websocket = function() {
        var coinbaseSocket = new WebSocket('wss://ws-feed.exchange.coinbase.com');

        coinbaseSocket.onmessage = function(event) {
            console.log(event.data);
            return event.data;
            //var msg = JSON.parse(event.data);
            //var time = new Date(msg.date);
        };
        return coinbaseSocket;
    };

})(fc);


