"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var User_1 = require("../models/User");
var server_1 = require("../../server");
var Solution_1 = require("../models/Solution");
var UserController = (function () {
    function UserController() {
    }
    UserController.Login = function (req, res) {
        User_1.UserSchema.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                console.log("Error at Login on UserController");
                res.json({ success: false, message: 'Invalid email' });
                return;
            }
            if (!user)
                res.json({ success: false, message: 'Invalid email' });
            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var sName_1;
                        Solution_1.SolutionSchema.findOne({ _id: user.solution }, function (err, solution) {
                            if (err || !solution)
                                return;
                            sName_1 = solution.name;
                        });
                        var expiresTime = req.body.selected === true ? 160800 : 60000;
                        var token = jwt.sign(user, server_1.Server.get('crypt_key'), { expiresIn: expiresTime });
                        var json = { solution: user.solution, solutionName: user.fullName, email: user.email, token: 'JWT ' + token };
                        res.json(json);
                    }
                    else
                        res.json({ success: false, message: 'Invalid password' });
                });
            }
        });
    };
    UserController.Register = function (req, res) {
        Solution_1.SolutionSchema.find({ _id: req.body.solution }, function (err, solution) {
            if (solution.length == 0 || err) {
                res.json({ status: false, message: "Invalid solution!" });
                return;
            }
            User_1.UserSchema.create(req.body, function (err, docs) {
                if (err) {
                    if (err.code == 11000)
                        res.json({ success: false, message: 'That email address already exits!' });
                    else
                        res.json({ success: false, message: 'Invalid email or password!' });
                    return;
                }
                res.json({ success: true, message: 'Successfuly created new user' });
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
