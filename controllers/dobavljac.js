const db = require("../core/db");
const httpMsgs = require("../core/httpMsgs");
const util = require("util");
/* const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); */

exports.getListDob = function(req, resp) {
    db.executeSql("SELECT * FROM dobavljac", function(data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};