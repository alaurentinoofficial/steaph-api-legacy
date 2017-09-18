"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require("passport");
var bodyParser = require("body-parser");
var compression = require("compression");
var Routes_1 = require("./app/config/Routes");
var Database_1 = require("./app/config/Database");
var Passport_1 = require("./app/config/Passport");
var UpdateEnvironmentsTask_1 = require("./app/jobs/UpdateEnvironmentsTask");
var Solution_1 = require("./app/models/Solution");
var User_1 = require("./app/models/User");
var app = express();
var argv = require('minimist')(process.argv.slice(2));
app.set('crypt_key', 'fjhshj45rujkf3284ksjsfj23hlsd54');
app.set('port', process.env.PORT || 8080);
app.set('debug', false);
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
Database_1.DbConfig({
    type: Database_1.Database.Mongo,
    ip: "127.0.0.1",
    port: "27017",
    database: "SE",
    username: null,
    password: null
});
Passport_1.Passport(app);
Routes_1.Router(app);
UpdateEnvironmentsTask_1.UpdateEnvironmentsCron(5000);
if (typeof (argv.c) !== 'undefined') {
    Solution_1.SolutionSchema.create({ name: "STEAPH" }, function (err, solution) {
        if (err)
            return console.log("Solution not created");
        User_1.UserSchema.create({ solution: solution, email: "alaurentino.br@gmail.com", password: "1234567890n" }, function (err, user) {
            if (err)
                return console.log("User not created");
            console.log("Succefuly");
        });
    });
}
exports.Server = app;
