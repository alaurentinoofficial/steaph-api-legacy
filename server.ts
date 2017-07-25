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
import { JobManager } from "./app/jobs/JobManager";
import { UpdateClassJob } from "./app/jobs/UpdateStatusJob";

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

export const Server: express.Application = app;