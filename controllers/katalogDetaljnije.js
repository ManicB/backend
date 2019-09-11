const db = require("../core/db");
const httpMsgs = require("../core/httpMsgs");
const util = require("util");
/* const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); */

exports.getListKatalogDetaljnije = function(req, resp) {
    db.executeSql("SELECT Proizvod.NazivProizvoda, Proizvođač.NazivProizvođača, VrstaProizvoda.Naziv, JedinicaMere.NazivMere, Pakovanje.VeličinaPakovanja, Artikal.Cena, StavkaKataloga.Količina FROM Artikal, Pakovanje, JedinicaMere, VrstaProizvoda, Proizvođač, Proizvod, StavkaKataloga", function(data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

//exports.get = function (req, resp, empno) {
//    db.executeSql("SELECT * FROM emp WHERE empno=" + empno, function (data, err) {
//        if (err) {
//            httpMsgs.show500(req, resp, err);
//        }
//        else {
//            httpMsgs.sendJson(req, resp, data);
//        }
//    });
//};

//exports.add = function (req, resp, reqBody) {
//    try {
//        if (!reqBody) throw new Error("Input not valid");
//        var data = JSON.parse(reqBody);
//        if (data) {
//            var sql = "INSERT INTO emp (empno, ename, sal, deptno) VALUES";
//            sql += util.format("(%d, '%s', %d, %d)", data.Empno, data.Ename, data.Sal, data.Deptno);
//            db.executeSql(sql, function (data, err) {
//                if (err) {
//                    httpMsgs.show500(req, resp, err);
//                }
//                else {
//                    httpMsgs.send200(req, resp);
//                }
//            });
//        }
//        else {
//            throw new Error("Input not valid");
//        }
//    }
//    catch (ex) {
//        httpMsgs.show500(req, resp, ex);
//    }
//};

//exports.update = function (req, resp, reqBody) {
//    try {
//        if (!reqBody) throw new Error("Input not valid");
//        var data = JSON.parse(reqBody);
//        if (data) {

//            if (!data.Empno) throw new Error("Empno not provided");

//            var sql = "UPDATE emp SET";

//            var isDataProvided = false;

//            if (data.Ename) {
//                sql += " Ename = '" + data.Ename + "',";
//                isDataProvided = true;
//            }

//            if (data.Sal) {
//                sql += " Sal = " + data.Sal + ",";
//                isDataProvided = true;
//            }

//            if (data.Deptno) {
//                sql += " Deptno = " + data.Deptno + ",";
//                isDataProvided = true;
//            }

//            sql = sql.slice(0, -1); //remove last comma
//            sql += " WHERE empno = " + data.Empno;

//            db.executeSql(sql, function (data, err) {
//                if (err) {
//                    httpMsgs.show500(req, resp, err);
//                }
//                else {
//                    httpMsgs.send200(req, resp);
//                }
//            });
//        }
//        else {
//            throw new Error("Input not valid");
//        }
//    }
//    catch (ex) {
//        httpMsgs.show500(req, resp, ex);
//    }
//};

//exports.delete = function (req, resp, reqBody) {
//    try {
//        if (!reqBody) throw new Error("Input not valid");
//        var data = JSON.parse(reqBody);
//        if (data) {

//            if (!data.Empno) throw new Error("Empno not provided");

//            var sql = "DELETE FROM emp";
//            sql += " WHERE empno = " + data.Empno;

//            db.executeSql(sql, function (data, err) {
//                if (err) {
//                    httpMsgs.show500(req, resp, err);
//                }
//                else {
//                    httpMsgs.send200(req, resp);
//                }
//            });
//        }
//        else {
//            throw new Error("Input not valid");
//        }
//    }
//    catch (ex) {
//        httpMsgs.show500(req, resp, ex);
//    }
//};