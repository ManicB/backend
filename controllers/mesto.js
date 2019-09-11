const db = require("../core/db");
const httpMsgs = require("../core/httpMsgs");
const util = require("util");
/* const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); */

exports.getList = function(req, resp) {
    db.executeSql("SELECT * FROM mesto", function(data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

/* exports.get = function(req, resp, mestoID) {
    db.executeSql("SELECT * FROM mesto WHERE MestoID=" + mestoID, function(data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
}; */

exports.add = function(req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        if (
            Object.keys(reqBody).length === 0) {
            return;
        }
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO mesto (MestoID, Naziv, BrojStanovnika, PttBroj) VALUES";
            sql += util.format("(%d, '%s', %d, %d)", data.MestoID, data.Naziv, data.BrojStanovnika, data.PttBroj);
            db.executeSql(sql, function(data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);

                } else {
                    httpMsgs.send200(req, resp);
                }
            });
        } else {
            throw new Error("Input not valid");

        }
    } catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

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

exports.delete = function(req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {

            if (!data.MestoID) throw new Error("MestoID not provided");

            var sql = "DELETE FROM mesto";
            sql += " WHERE MestoID = " + data.MestoID;

            db.executeSql(sql, function(data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                } else {
                    httpMsgs.send200(req, resp);
                }
            });
        } else {
            throw new Error("Input not valid");
        }
    } catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};