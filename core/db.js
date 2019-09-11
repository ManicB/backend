const sqlDb = require("mssql");
const settings = require("../settings");
/* const express = require('express');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 */
exports.executeSql = function(sql, callback) {

    const conn = new sqlDb.ConnectionPool(settings.dbConfig);
    conn.connect()
        .then(function() {
            const req = new sqlDb.Request(conn);
            req.query(sql)
                .then(function(recordset) {
                    callback(recordset);
                })
                .catch(function(err) {
                    console.log(err);
                    callback(null, err);
                });
        })
        .catch(function(err) {
            console.log(err);
            callback(null, err);
        });
};