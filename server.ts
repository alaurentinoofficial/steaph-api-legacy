import * as express from 'express';
import * as passport from "passport";
import * as bodyParser from "body-parser";
import * as compression from "compression";

import { Router } from "./app/config/Routes";
import { DbConfig, Database } from "./app/config/Database";
import { Passport } from "./app/config/Passport";
import { EnvironmentSchema, EnvironmentStatusSchema, Environment } from "./app/models/Environment";
import { SolutionSchema, Solution } from "./app/models/Solution";
import { UserSchema } from "./app/models/User";

const app: express.Application = express();

app.set('crypt_key', 'fjhshj45rujkf3284ksjsfj23hlsd54');
app.set('port', process.env.PORT || 8080);

app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize())

DbConfig({
    type: Database.Mongo,
    ip: "127.0.0.1",
    port: "27017",
    database: "SE"
});
Passport(app);
Router(app);

// var solution = new SolutionSchema({name: "CESAR"});

// let user = new UserSchema({solution: solution, email: "cesar@exemple.com", password: "1234567890n"});
// user.save();

// let env1 = new EnvironmentSchema({solution: solution, name: "Labs"});
// env1.status = new EnvironmentStatusSchema({environment: env1,
//     status: true,
//     motion: true,
//     temperarue: 18,
//     noisy: 106,
//     gas: 0});
// env1.save();

// solution.environments.push(env1);
// solution.save();

export const Server: express.Application = app;