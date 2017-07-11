"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JobManager = (function () {
    function JobManager() {
    }
    JobManager.prototype.addJob = function (j) {
        this.jobs.push(j);
        return this;
    };
    ;
    JobManager.prototype.executeAllJobs = function () {
        this.jobs.forEach(function (e) {
            e.Run();
        });
    };
    return JobManager;
}());
exports.JobManager = JobManager;
