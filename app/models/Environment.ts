import * as mongoose from "mongoose";
import * as relationship from "mongoose-relationship";
import { Solution } from "./Solution";

export class Environment {
    public solution: string;
    public name: string;
    public status: EnvironmentStatus[];
    public schedule: EnvironmentSchedule[];

    constructor(solution: string, name: string) {
        this.solution = solution;
        this.name = name;

        EnvironmentStatusSchema.find({solution: solution, name: name}, (err, status) => {
            if(err || status.length == 0) return;
            this.status = status;
        });

        EnvironmentScheduleSchema.find({solution: solution, name: name}, (err, schedule) => {
            if(err || schedule.length == 0) return;
            this.schedule = schedule;
        });
    }
}

export class EnvironmentStatus {
    public environment: Environment;
    public status: boolean;
    public motion: boolean;
    public temperature: number;
    public noisy: number;
    public gas: number;
}

export class EnvironmentSchedule {
    public environment: Environment;
    public status: boolean;
    public start: Date;
    public end: Date;
}

let environmentSchema = new mongoose.Schema({
    name: {type: String, required: true, index: true},
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"environments"},
    status: [{type: mongoose.Schema.ObjectId, ref:"EnvironmentStatus", required: false}],
    schedule: [{type: mongoose.Schema.ObjectId, ref:"EnvironmentSchdule", required: false}]
});
environmentSchema.plugin(relationship, { relationshipPathName:'solution' });
export const EnvironmentSchema = mongoose.model('Environment', environmentSchema);

let environmentStatusSchema = new mongoose.Schema({
    environment: {type: mongoose.Schema.ObjectId, ref:"Environment", childPath:"status"},
    status: {type: Boolean, required: true},
    motion: {type: Boolean, required: true},
    temperature: {type: Number, required: true},
    noisy: {type: Number, required: true},
    gas: {type: Number, required: true}
});
environmentStatusSchema.plugin(relationship, { relationshipPathName:'environment' });
export const EnvironmentStatusSchema = mongoose.model('EnvironmentStatus', environmentStatusSchema);

let environmentScheduleSchema = new mongoose.Schema({
    environment: {type: mongoose.Schema.ObjectId, ref:"Environment", childPath:"schedule"},
    status: {type: Boolean, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true}
});
environmentScheduleSchema.plugin(relationship, { relationshipPathName:'environment' });
export const EnvironmentScheduleSchema = mongoose.model('EnvironmentSchedule', environmentScheduleSchema);