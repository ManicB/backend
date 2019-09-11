const db = require("../core/db");
const httpMsgs = require("../core/httpMsgs");
const util = require("util");
/* const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); */

exports.getListArtikal = function(req, resp) {
    db.executeSql("SELECT * FROM artikal", function(data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};