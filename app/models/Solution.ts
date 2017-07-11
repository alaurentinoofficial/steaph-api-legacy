import * as mongoose from "mongoose";
import * as relationship from "mongoose-relationship";

import { Environment, EnvironmentSchema } from "./Environment";
import { User, UserSchema } from "./User";

export class Solution {
    public name: string;
    public user: User;
    public environments: Environment[];

    constructor(name: string) {
        this.name = name;

        UserSchema.find({solution: this.name}, (err, docs) => {
            if(err) {
                console.log("\nInternal ERROR> User not found!!!\n");
                console.log(err);
                return;
            }

            this.user = docs;
        });

        EnvironmentSchema.find({solution: this.name}, (err, docs) => {
            if(err) {
                console.log("\nInternal ERROR> Environments not found!!!\n");
                console.log(err);
                return;
            }

            this.environments = docs;
        });
    }
}

let solutionSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    user: {type: mongoose.Schema.ObjectId, ref:"User", required: false},
    environments: [{type: mongoose.Schema.ObjectId, ref:"Environment", required: false}],
});

export const SolutionSchema = mongoose.model('Solution', solutionSchema);