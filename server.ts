import * as express from 'express';
import * as passport from "passport";
import * as bodyParser from "body-parser";
import * as compression from "compression";

import { Router } from "./app/config/Routes";
import { DbConfig, Database } from "./app/config/Database";
import { Passport } from "./app/config/Passport";
import { UpdateEnvironmentsCron } from "./app/jobs/UpdateEnvironmentsTask";
import { SolutionSchema } from './app/models/Solution';
import { UserSchema } from './app/models/User';

const app: express.Application = express();

var argv = require('minimist')(process.argv.slice(2));

app.set('crypt_key', 'fjhshj45rujkf3284ksjsfj23hlsd54');
app.set('port', process.env.PORT || 8080);
app.set('debug', false);

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

if(typeof(argv.c) !== 'undefined')
{
    SolutionSchema.create({name: "STEAPH"}, (err, solution) => {
        if(err)
            return console.log("Solution not created");
    
        UserSchema.create({solution: solution, email: "alaurentino.br@gmail.com", password: "1234567890n"}, (err, user) => {
            if(err)
                return console.log("User not created");
            
            console.log("Succefuly");
        })
    });
}

export const Server: express.Application = app;