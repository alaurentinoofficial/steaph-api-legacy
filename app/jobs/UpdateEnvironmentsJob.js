"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt = require("mqtt");
var Environment_1 = require("../models/Environment");
var UpdateStatus = function (updates) {
    var client = mqtt.connect({
        host: 'm11.cloudmqtt.com',
        port: 14581,
        username: 'zqakfvdw',
        password: 'mSXZM1Lvajuw',
        clientId: 'Steaph-API'
    });
    client.on('connect', function () {
        updates.forEach(function (e) {
            client.publish('steaph/environments/' + e.environment + "/status", e.status ? "true" : "false", { qos: 1, retain: false });
            console.log("> Set status " + e.environment + " = " + e.status);
        });
        client.end();
    });
};
exports.UpdateEnvironmentsCron = function (delay) {
    Environment_1.EnvironmentScheduleSchema.find({}, function (err, schedules) {
        if (err || schedules.length == 0)
            return;
        var updates = Array();
        var now = new Date();
        var d = new Date(now);
        d.setHours(now.getHours() + 1);
        schedules.forEach(function (s) {
            if (d > _baseDate(new Date(s.start))
                && now <= _baseDate(new Date(s.end))) {
                updates.push({ environment: s.environment, status: true });
            }
            else {
                updates.push({ environment: s.environment, status: false });
            }
        });
        UpdateStatus(updates);
    });
    setTimeout(function () { exports.UpdateEnvironmentsCron(delay); }, delay);
};
var Status = (function () {
    function Status() {
    }
    return Status;
}());
exports.Status = Status;
var _baseDate = function (date) {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};
