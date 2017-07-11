"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Database = (function () {
    function Database() {
    }
    Database.Mongo = "mongodb";
    return Database;
}());
exports.Database = Database;
exports.DbConfig = function (config) {
    mongoose.connect(config.type + "://"
        + config.ip + ":"
        + config.port + "/"
        + config.database, { useMongoClient: true });
    mongoose.connection.on('connected', function () {
        console.log('\n> Database connected!\n');
    });
    mongoose.connection.on('error', function (err) {
        console.log('\n> Error - Database: ' + err + '\n');
    });
    mongoose.connection.on('disconnected', function () {
        console.log('\n> Database disconnected!\n');
    });
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('\n> Closing application!\n');
            process.exit(0);
        });
    });
};
