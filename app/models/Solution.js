"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Environment_1 = require("./Environment");
var User_1 = require("./User");
var Solution = (function () {
    function Solution(name) {
        var _this = this;
        this.name = name;
        User_1.UserSchema.find({ solution: this.name }, function (err, docs) {
            if (err) {
                console.log("\nInternal ERROR> User not found!!!\n");
                console.log(err);
                return;
            }
            _this.user = docs;
        });
        Environment_1.EnvironmentSchema.find({ solution: this.name }, function (err, docs) {
            if (err) {
                console.log("\nInternal ERROR> Environments not found!!!\n");
                console.log(err);
                return;
            }
            _this.environments = docs;
        });
    }
    return Solution;
}());
exports.Solution = Solution;
var solutionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: false },
    environments: [{ type: mongoose.Schema.ObjectId, ref: "Environment", required: false }],
});
exports.SolutionSchema = mongoose.model('Solution', solutionSchema);
