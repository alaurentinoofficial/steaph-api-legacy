"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Solution_1 = require("./app/models/Solution");
var User_1 = require("./app/models/User");
exports.CreateUser = function (solution, email, password) {
    var u = { solution: solution, email: email, password: password };
    User_1.UserSchema.create(u, function (err, user) {
        if (err)
            console.log("\n> User not created!");
        return user;
    });
};
exports.CreateSolution = function (name) {
    Solution_1.SolutionSchema.create({ name: name }, function (err, solu) {
        if (err)
            console.log("\n> Solution not created!");
        return solu;
    });
};
