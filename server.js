"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require("passport");
var bodyParser = require("body-parser");
var compression = require("compression");
var Routes_1 = require("./app/config/Routes");
var Database_1 = require("./app/config/Database");
var Passport_1 = require("./app/config/Passport");
var UpdateEnvironmentsJob_1 = require("./app/jobs/UpdateEnvironmentsJob");
var app = express();
app.set('crypt_key', 'fjhshj45rujkf3284ksjsfj23hlsd54');
app.set('port', process.env.PORT || 8080);
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
UpdateEnvironmentsJob_1.UpdateEnvironments(30000);
// EnvironmentSchema.findOne({name: "Alaurentino"}, (err, env) => {
//     if(err || env == null) {
//         return;
//     }
//     var now = new Date();
//     let body = {environment: env._id, status: false, start: now, end: now.setMinutes(now.getMinutes() + 2)};
//     EnvironmentScheduleSchema.create(body, (err) => {
//         if(err)
//             return console.log("Erro ao criar");
//         console.log("Tempo criado com sucesso");
//     })
// });
exports.Server = app;
