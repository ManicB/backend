const settings = require("../settings");
/* const express = require('express');
const app = express(); */

exports.show500 = function(req, resp, err) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(500, "Internal Error occured.", { "Content-Type": "text/html" });
        resp.write("<html><head><title>500</title></head><body>500: Internal Error. Details: " + err + "</body></html>");
    } else {
        resp.writeHead(500, "Internal Error occured.", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "ERROR ocurred:" + err }));
    }
    resp.end();
};

exports.sendJson = function(req, resp, data) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    if (data) {
        resp.write(JSON.stringify(data));
    }
    resp.end();
};

exports.show405 = function(req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        resp.write("<html><head><title>405</title></head><body>405: Method not supported</body></html>");
    } else {
        resp.writeHead(405, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Method not supported" }));
    }
    resp.end();
};

exports.show404 = function(req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found</body></html>");
    } else {
        resp.writeHead(404, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Resource not found" }));
    }
    resp.end();
};

exports.show413 = function(req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "text/html" });
        resp.write("<html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>");
    } else {
        resp.writeHead(413, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Request Entity Too Large" }));
    }
    resp.end();
};

exports.send200 = function(req, resp) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.end();
};

exports.showHome = function(req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write("<html><head><title>Home</title></head><body>Valid endpoints: <br> /employees - GET - To List all Employees<br>/employees/empno - GET - To Search for an Employee with 'empno'</body></html>");
    } else {
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.write(JSON.stringify([
            { url: "/employees", operation: "GET", description: "To List all Employees" },
            { url: "/employees/<empno>", operation: "GET", description: "To Search for an Employee" },
        ]));
    }
    resp.end();
};