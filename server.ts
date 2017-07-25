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
import { UpdateEnvironmentsCron } from "./app/jobs/UpdateEnvironmentsJob";

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


//
// TESTES UNITATRIO (:D)
//

// EnvironmentSchema.findOne({name: "Alaurentino"}, (err, env) => {
//     if(err || env == null) {
//         return;
//     }

//     var now = new Date();
//     let body = {environment: env._id, status: false, start: now, end: now.setMinutes(now.getMinutes() + 1)};
//     EnvironmentScheduleSchema.create(body, (err) => {
//         if(err)
//             return console.log("Erro ao criar");
        
//         console.log("Tempo criado com sucesso");
//     })
// });

// var body = {name: "CESAR" };
// SolutionSchema.create(body, (err, s) => {
//     if(err) 
//         return console.log("deu pau");
    
//     var user = {solution: s._id, email: "cesar@exemple.com", password: "1234567890n"};
//     UserSchema.create(user, (e, u) => {
//         if(e)
//             return console.log(e);
        
//         console.log("tudo p..., certo!");
//     })
// });

UpdateEnvironmentsCron(10000);

export const Server: express.Application = app;