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
// Unit Testing (:D)
// ==============================
// Environment Schedule Test
// ===============================
//
// EnvironmentSchema.findOne({name: "Labs"}, (err, env) => {
//     if(err || env == null) {
//         return;
//     }
//     var now = new Date();
//     let body = {environment: env._id, status: false, start: now, end: now.setMinutes(now.getMinutes() + 1)};
//     EnvironmentScheduleSchema.create(body, (err) => {
//         if(err)
//             return console.log("Erro ao criar");
//         console.log("Tempo criado com sucesso");
//     })
// });
// var start = new Date();
// var end = new Date(start);
// end.setMinutes(end.getMinutes() + 10)
// let body = {start: start, end: end};
// console.log(body);
// ==============================
// Solution Relation Test
// ===============================
//
// var body = {name: "CESAR" };
// SolutionSchema.create(body, (err, s) => {
//     if(err) 
//         return console.log("deu pau");
//     var user = {solution: s._id, email: "cesar@exemple.com", password: "1234567890n"};
//     UserSchema.create(user, (e, u) => {
//         if(e)
//             return console.log(e);
//         console.log("tudo p..., certo!");
//     })
// });
UpdateEnvironmentsJob_1.UpdateEnvironmentsCron(10000);
exports.Server = app;
