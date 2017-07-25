"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var relationship = require("mongoose-relationship");
var Environment = (function () {
    function Environment(solution, name) {
        var _this = this;
        this.solution = solution;
        this.name = name;
        exports.EnvironmentStatusSchema.find({ solution: solution, name: name }, function (err, status) {
            if (err || status.length == 0)
                return;
            _this.status = status;
        });
        exports.EnvironmentScheduleSchema.find({ solution: solution, name: name }, function (err, schedule) {
            if (err || schedule.length == 0)
                return;
            _this.schedule = schedule;
        });
    }
    return Environment;
}());
exports.Environment = Environment;
var EnvironmentStatus = (function () {
    function EnvironmentStatus() {
    }
    return EnvironmentStatus;
}());
exports.EnvironmentStatus = EnvironmentStatus;
var EnvironmentSchedule = (function () {
    function EnvironmentSchedule() {
    }
    return EnvironmentSchedule;
}());
exports.EnvironmentSchedule = EnvironmentSchedule;
var environmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    solution: { type: mongoose.Schema.ObjectId, ref: "Solution", childPath: "environment", required: true, unique: false },
    status: [{ type: mongoose.Schema.ObjectId, ref: "EnvironmentStatus", required: false }],
    schedule: [{ type: mongoose.Schema.ObjectId, ref: "EnvironmentSchdule", required: false }]
});
environmentSchema.plugin(relationship, { relationshipPathName: 'solution' });
exports.EnvironmentSchema = mongoose.model('Environment', environmentSchema);
var environmentStatusSchema = new mongoose.Schema({
    environment: { type: mongoose.Schema.ObjectId, ref: "Environment", childPath: "status" },
    status: { type: Boolean, required: true },
    motion: { type: Boolean, required: true },
    temperature: { type: Number, required: true },
    noisy: { type: Number, required: true },
    gas: { type: Number, required: true }
});
environmentStatusSchema.plugin(relationship, { relationshipPathName: 'environment' });
exports.EnvironmentStatusSchema = mongoose.model('EnvironmentStatus', environmentStatusSchema);
var environmentScheduleSchema = new mongoose.Schema({
    environment: { type: mongoose.Schema.ObjectId, ref: "Environment", childPath: "schedule" },
    status: { type: Boolean, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true }
});
environmentScheduleSchema.plugin(relationship, { relationshipPathName: 'environment' });
exports.EnvironmentScheduleSchema = mongoose.model('EnvironmentSchedule', environmentScheduleSchema);
