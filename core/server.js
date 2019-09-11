const http = require("http");
const mestoRouter = require("../controllers/mesto");
const dobavljacRouter = require("../controllers/dobavljac");
const kupacRouter = require("../controllers/kupac");
const artikalRouter = require("../controllers/artikal");
const katalogRouter = require("../controllers/katalog");
const katalogDetaljnijeRouter = require("../controllers/katalogDetaljnije");
const settings = require("../settings");
const httpMsgs = require("./httpMsgs");
/* const express = require('express');
const app = express();
const cors = require('cors'); */

http.createServer(function(req, resp) {

    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.setHeader('Access-Control-Request-Method', '*');
    resp.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    resp.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        resp.writeHead(200);
    };
    console.log(req.method);
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsgs.showHome(req, resp);
            } else if (req.url === "/mesto") {
                mestoRouter.getList(req, resp);
            } else if (req.url === "/dobavljac") {
                dobavljacRouter.getListDob(req, resp);
            } else if (req.url === "/kupac") {
                kupacRouter.getListKupac(req, resp);
            } else if (req.url === "/artikal") {
                artikalRouter.getListArtikal(req, resp);
            } else if (req.url === "/katalog") {
                katalogRouter.getListKatalog(req, resp);
            } else if (req.url === "/katalogDetaljnije") {
                katalogDetaljnijeRouter.getListKatalogDetaljnije(req, resp);
            }
            /* else {
                           var MestoIDPatt = "[0-9]+";
                           var patt = new RegExp("/mesto/" + MestoIDPatt);
                           if (patt.test(req.url)) {
                               patt = new RegExp(MestoIDPatt);
                               var MestoID = patt.exec(req.url);
                               mesto.get(req, resp, MestoID);
                           } else {
                               httpMsgs.show404(req, resp);
                           }
                       } */
            break;
        case "POST":
            if (req.url === "/mesto/dodajMesto") {
                var reqBody = '';
                req.on("data", function(data) {
                    console.log("server data" + data);
                    reqBody += data;
                    if (reqBody.length > 1e7) //10MB 
                    {
                        httpMsgs.show413(req, resp);
                    }
                });

                req.on("end", function() {
                    mestoRouter.add(req, resp, reqBody);
                });
            } else {
                httpMsgs.show404(req, resp);
            }
            break;
            //case "PUT":
            //    if (req.url === "/employees") {
            //        var reqBody = '';
            //        req.on("data", function (data) {
            //            reqBody += data;
            //            if (reqBody.length > 1e7) //10MB 
            //            {
            //                httpMsgs.show413(req, resp);
            //            }
            //        });

            //        req.on("end", function () {
            //            emp.update(req, resp, reqBody);
            //        });
            //    }
            //    else {
            //        httpMsgs.show404(req, resp);
            //    }
            //    break;
        case "DELETE":
            if (req.url === "/mesto/obrisiMesto") {
                var reqBody = '';
                req.on("data", function(data) {
                    console.log(data + " DATA DELETE");
                    reqBody += data;
                    if (reqBody.length > 1e7) //10MB 
                    {
                        httpMsgs.show413(req, resp);
                    }
                });

                req.on("end", function() {
                    mestoRouter.delete(req, resp, reqBody);
                });
            } else {
                httpMsgs.show404(req, resp);
            }
            break;
        default:
            httpMsgs.show405(req, resp);
            break;
    };



}).listen(settings.webPort, function() {
    console.log("Started listening at: " + settings.webPort);
});