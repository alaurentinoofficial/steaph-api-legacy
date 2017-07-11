import * as mongoose from "mongoose";

export class Database {
    public type: string;
    public ip: string;
    public port: string;
    public database: string;

    public static Mongo = "mongodb";
}

export const DbConfig = (config: Database) => {
    mongoose.connect(config.type + "://"
                    + config.ip + ":"
                    + config.port + "/"
                    + config.database, { useMongoClient: true });

    mongoose.connection.on('connected', () => {
        console.log('\n> Database connected!\n');
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