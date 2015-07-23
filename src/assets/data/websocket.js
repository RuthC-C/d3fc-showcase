
var webSocket = new Windows.Networking.Sockets.StreamWebSocket();
webSocket.connectAsync("wss://ws-feed.exchange.coinbase.com").done(function() {
     // connect succeeded
}, function(error) {
     // connect failed
});


var streamWebSocket;
var dataReader;
var countOfDataReceived;

function start() {
    if (streamWebSocket) {
        console.log("WebSocket is running");
        return;
    }
    var webSocket = new Windows.Networking.Sockets.StreamWebSocket();
    webSocket.onclosed = onClosed;
    var uriString = "wss://ws-feed.exchange.coinbase.com";
    
    var serverUri
    try{
        serverUri = new Windows.Foundation.Uri(uriString);
    }[catch (Exception) {
        displayStatus("Invalid URI, please re-enter a valid URI");
        return;
    }]

    if (serverUri.schemeName != "ws" && serverUri.schemeName != "wss") {
        displayStatus("Only 'ws' and 'wss' schemes supported. Please re-enter URI");
        return;
    }
    
    webSocket.connectAsync(uri).done(function () {
        displayStatus("Connected");
        streamWebSocket = webSocket;
        dataReader = new Windows.Storage.Streams.DataReader(webSocket.inputStream);
         // When buffering, return as soon as any data is available.
        dataReader.inputStreamOptions = Windows.Storage.Streams.InputStreamOptions.partial;
        countOfDataReceived = 0;

        // Continuously listen for a response
        readIncoming();

    }, function (error) {
        var errorStatus = Windows.Networking.Sockets.WebSocketError.getStatus(error.number);
        if (errorStatus === Windows.Web.WebErrorStatus.cannotConnect ||
             errorStatus === Windows.Web.WebErrorStatus.notFound ||
             errorStatus === Windows.Web.WebErrorStatus.requestTimeout) {
             displayStatus("Cannot connect to the server");
        } else {
            displayStatus("Failed to connect: " + getError(error));
        }
    })
}

function readIncoming(args) {
    dataReader.loadAsync(100).done(function (sizeBytesRead) {
        countOfDataReceived += sizeBytesRead;
        
        var incomingBytes = new Array(sizeBytesRead);
        dataReader.readBytes(incomingByes);
        
        //Do something with said data
        
        readIncoming();
    }, readError);
}
function readError(error) {
    console.log("Read Error");
}

function onClosed(args) {
    console.log("web Socket closed");
    if (streamWebSocket) {
        streamWebSocket.close();
    }
    streamWebSocket = null;
}