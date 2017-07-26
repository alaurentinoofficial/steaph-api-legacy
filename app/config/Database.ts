import * as mongoose from "mongoose";
import { Server } from "../../server";

export class Database {
    public type: string;
    public ip: string;
    public port: string;
    public database: string;
    public username: string;
    public password: string;

    public static Mongo = "mongodb";
}

export const DbConfig = (config: Database) => {
    var user = config.username
                        && config.password
                        ? config.username + ":" + config.password + "@" : "";
    mongoose.connect(config.type + "://"
                    + user
                    + config.ip + ":"
                    + config.port + "/"
                    + config.database, { useMongoClient: true });
    MongoDB = false;

    mongoose.connection.on('connected', () => {
        console.log('\n> Database connected!\n');
        MongoDB = true;
    });

    mongoose.connection.on('error', (err) => {
        console.log('\n> Error - Database: ' + err + '\n');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('\n> Database disconnected!\n');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(() => {
            console.log('\n> Closing application!\n');
            process.exit(0);
        });
    });
}

export var MongoDB: Boolean;