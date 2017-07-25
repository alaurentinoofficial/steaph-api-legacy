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
import { JobManager } from "./app/jobs/JobManager";
import { UpdateClassJob } from "./app/jobs/UpdateStatusJob";
import { UpdateEnvironments } from "./app/jobs/UpdateEnvironmentsJob";

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

UpdateEnvironments(30000);

// EnvironmentSchema.findOne({name: "Alaurentino"}, (err, env) => {
//     if(err || env == null) {
//         return;
//     }

//     var now = new Date();
//     let body = {environment: env._id, status: false, start: now, end: now.setMinutes(now.getMinutes() + 2)};
//     EnvironmentScheduleSchema.create(body, (err) => {
//         if(err)
//             return console.log("Erro ao criar");
        
//         console.log("Tempo criado com sucesso");
//     })
// });

export const Server: express.Application = app;