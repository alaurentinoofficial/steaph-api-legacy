"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var Environment_1 = require("../models/Environment");
var Solution_1 = require("../models/Solution");
var server_1 = require("../../server");
var EnvironmentController = /** @class */ (function () {
    function EnvironmentController() {
    }
    EnvironmentController.Get = function (req, res) {
        var token = req.headers["authorization"].replace("JWT ", "");
        var payload = jwt.verify(token ? token : "", server_1.Server.get('crypt_key'))._doc;
        Solution_1.SolutionSchema.findOne({ user: payload }, function (err, solution) {
            if (err)
                return res.status(500).json([]);
            Environment_1.EnvironmentSchema.find({ solution: solution }, function (err, envs) {
                if (err)
                    return res.status(500).json([]);
                res.status(200).json(envs);
            });
        });
    };
    EnvironmentController.Post = function (req, res) {
        var token = req.headers['authorization'].replace("JWT ", "");
        var payload = jwt.verify(token ? token : "", server_1.Server.get('crypt_key'))._doc;
        Solution_1.SolutionSchema.findOne({ user: payload }, function (err, solution) {
            if (!solution || err)
                return res.json({ status: false, message: "Invalid solution!" });
            var env = { name: req.body.name, solution: solution._id };
            Environment_1.EnvironmentSchema.create(env, function (err, docs) {
                if (err) {
                    if (err.code == 11000)
                        res.json({ status: false, message: "Environment already created!", code: err });
                    else
                        res.json({ status: false, message: "Invalid environment!", code: err.code });
                    return;
                }
                res.json({ status: true, message: "Succefuly created environment!" });
            });
        });
    };
    ;
    EnvironmentController.PutById = function (req, res) {
        var env = req.body;
        if (!req.params.id || !env)
            return res.json({ status: false, message: "Invalid environment!" });
        var token = req.headers['authorization'].replace("JWT ", "");
        var payload = jwt.verify(token ? token : "", server_1.Server.get('crypt_key'))._doc;
        Solution_1.SolutionSchema.find({ user: payload }, function (err, solution) {
            if (!solution || err)
                return res.json({ status: false, message: "Invalid solution!" });
            Environment_1.EnvironmentSchema.findOneAndUpdate({ _id: req.params.id }, env, { upsert: true }, function (err) {
                if (err)
                    return res.json({ status: false, message: "Invalid environment!" });
                res.json({ status: true, message: "Succefuly updated environment!" });
            });
        });
    };
    ;
    EnvironmentController.DeleteById = function (req, res) {
        if (!req.params.id)
            return res.json({ status: false, message: "Invalid environment!" });
        var token = req.headers["authorization"].replace("JWT ", "");
        var payload = jwt.verify(token ? token : "", server_1.Server.get('crypt_key'))._doc;
        Solution_1.SolutionSchema.findOne({ user: payload }, function (err, docs) {
            if (err || !docs)
                return res.json({ status: false, message: "Invalid token!" });
            Environment_1.EnvironmentSchema.remove({ solution: docs, _id: req.params.id }, function (err, d) {
                if (err)
                    return res.json({ status: false, message: "Invalid environment!" });
                res.json({ status: true, message: "Environment deleted!" });
            });
        });
    };
    return EnvironmentController;
}());
exports.EnvironmentController = EnvironmentController;
var EnvironmentScheduleController = /** @class */ (function () {
    function EnvironmentScheduleController() {
    }
    EnvironmentScheduleController.Get = function (req, res) {
        var token = req.headers["authorization"].replace("JWT ", "");
        var payload = jwt.verify(token ? token : "", server_1.Server.get('crypt_key'))._doc;
        var env = req.body;
        if (!req.params.env || !env)
            return res.json({ status: false, message: "Invalid environment!" });
        Solution_1.SolutionSchema.findOne({ user: payload }, function (err, s) {
            if (err || !s)
                return res.status(500).json([]);
            Environment_1.EnvironmentSchema.find({ solution: s, _id: req.params.env }, function (e, env) {
                if (e || !env)
                    return res.status(500).json([]);
                Environment_1.EnvironmentScheduleSchema.find({ environment: env }, function (err, schedules) {
                    if (err)
                        return res.status(500).json([]);
                    res.status(200).json(schedules);
                });
            });
        });
    };
    EnvironmentScheduleController.PostById = function (req, res) {
        var env = req.body;
        if (!req.params.env || !env)
            return res.json({ status: false, message: "Invalid environment!" });
        var token = req.headers['authorization'].replace("JWT ", "");
        var payload = jwt.verify(token ? token : "", server_1.Server.get('crypt_key'))._doc;
        Solution_1.SolutionSchema.find({ user: payload }, function (err, solution) {
            if (!solution || err)
                return res.json({ status: false, message: "Invalid solution!" });
            Environment_1.EnvironmentSchema.findOne({ _id: req.params.env }, function (err, e) {
                if (err || !e)
                    return res.json({ status: false, message: "Invalid environment!" });
                var b = { environment: e._id, start: new Date(req.body.start), end: new Date(req.body.end), status: true };
                Environment_1.EnvironmentScheduleSchema.create(b, function (err, e) {
                    if (err)
                        return res.json({ status: false, message: /*"Invalid schedule!*/ new Date() });
                    return res.json({ status: true, message: "Succefuly to add new schedule!" });
                });
            });
        });
    };
    ;
    EnvironmentScheduleController.DeleteById = function (req, res) {
        if (!req.params.id || !req.params.env)
            return res.json({ status: false, message: "Invalid environment schedule!" });
        var token = req.headers["authorization"].replace("JWT ", "");
        var payload = jwt.verify(token ? token : "", server_1.Server.get('crypt_key'))._doc;
        Solution_1.SolutionSchema.findOne({ user: payload }, function (err, docs) {
            if (err || !docs)
                return res.json({ status: false, message: "Invalid token!" });
            Environment_1.EnvironmentScheduleSchema.remove({ _id: req.params.id, environment: req.params.env }, function (err, d) {
                if (err)
                    return res.json({ status: false, message: "Invalid schdule!" });
                res.json({ status: true, message: "Schedule deleted!" });
            });
        });
    };
    return EnvironmentScheduleController;
}());
exports.EnvironmentScheduleController = EnvironmentScheduleController;
