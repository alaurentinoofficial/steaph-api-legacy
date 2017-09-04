import * as express from 'express';
import * as passport from "passport";
import * as bodyParser from "body-parser";
import * as compression from "compression";

import { Router } from "./app/config/Routes";
import { DbConfig, Database } from "./app/config/Database";
import { Passport } from "./app/config/Passport";
import { EnvironmentSchema, EnvironmentStatusSchema, Environment, EnvironmentScheduleSchema } from "./app/models/Environment";
import { SolutionSchema, Solution } from "./app/models/Solution";
import { UserSchema } from "./app/models/User";
import { UpdateEnvironmentsCron } from "./app/Jobs/UpdateEnvironmentsTask";

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
    database: "SE",
    username: null,
    password: null
});
Passport(app);
Router(app);
UpdateEnvironmentsCron(5000);

export const Server: express.Application = app;