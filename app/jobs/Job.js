"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Job = (function () {
    function Job(delayTime) {
        this.delayTime = delayTime;
    }
    Job.prototype.Run = function () {
        if (this.repeat)
            setTimeout(this.Execute, 5000);
        else
            this.Execute();
    };
    return Job;
}());
exports.Job = Job;
