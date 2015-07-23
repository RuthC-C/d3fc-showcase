var coinbaseSocket = new WebSocket("wss://ws-feed.exchange.coinbase.com");

coinbaseSocket.onmessage = function(event) {
    console.log(event.data);
}

