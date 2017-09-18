import { DbConfig, Database } from "./app/config/Database";

import { EnvironmentSchema, EnvironmentStatusSchema, Environment, EnvironmentScheduleSchema } from "./app/models/Environment";
import { SolutionSchema, Solution } from "./app/models/Solution";
import { UserSchema } from "./app/models/User";

export var CreateUser = (solution, email: string, password: string) => {
    var u = {solution: solution, email: email, password: password};

    UserSchema.create(u, (err, user) => {
        if(err)
            console.log("\n> User not created!");

        return user;
    });
}

export var CreateSolution = (name: string)  => {
    SolutionSchema.create({name: name}, function(err, solu) {
        if(err)
            console.log("\n> Solution not created!");

        return solu._id;
    });
}