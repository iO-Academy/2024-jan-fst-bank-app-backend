"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
var dbConnection_1 = require("../dbConnection/dbConnection");
var registerUser = function (user) {
    var query = "INSERT INTO customers (first_name, last_name, email, passcode, customer_number)\n         VALUES (?, ?, ?, ?, ?)";
    return new Promise(function (resolve, reject) {
        dbConnection_1.default.query(query, [user.first_name, user.last_name, user.email, user.passcode, user.passcode, user.customer_number], function (err, results) {
            if (err) {
                reject(err);
            }
            else {
                resolve(results);
            }
        });
    });
};
exports.registerUser = registerUser;
