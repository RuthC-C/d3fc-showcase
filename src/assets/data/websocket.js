/*var ws;
(function(ws) {
    'use strict';
    fc.data.websocket = function() {
        if (window.WebSocker) {
            console.log('Websocket object is support in browser');
            ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');
            ws.onopen = function() {
                console.log('onopen');
            };
            ws.onmessage = function(event) {
                console.log('echo from serve : ' + event.data);
            };

            ws.onclose = function() {
                console.log('onclose');
            };
            ws.onerror = function() {
                console.log('onerror');
            };

        } else {
            console.log('Websocket object not supported in your browser');
        }
        return ws;
    };

})(ws);*/




(function(fc) {
    'use strict';

    fc.data.websocket = function() {

        var websocket = function(cb) {
            var coinbaseSocket = new WebSocket('wss://ws-feed.exchange.coinbase.com');

            var msg = {
                type: 'subscribe',
                product_id: 'BTC-USD'
            };

            coinbaseSocket.onopen = function() {
                // Send the msg object as a JSON-formatted string.
                coinbaseSocket.send(JSON.stringify(msg));
            };

            coinbaseSocket.onmessage = function(event) {
                console.log(event.data);
                cb(null, event.data);
                //var msg = JSON.parse(event.data);
                //var time = new Date(msg.date);
            };

        };
        return websocket;
    };

})(fc);
