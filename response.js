const http = require('http');
const url = require('url');


exports.sendResponse = function (res, status, type, body) {
    // sends response body in JSON format
    console.log("inside sendresponse");
    res.writeHead(status, { 'Content-Type': type });
    console.log("sending back: " + JSON.stringify(body));
    res.write(JSON.stringify(body));
    res.end();
};