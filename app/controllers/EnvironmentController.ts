import * as jwt from "jsonwebtoken";

import { Request, Response } from 'express';
import { Environment, EnvironmentSchema, EnvironmentScheduleSchema } from "../models/Environment";
import { SolutionSchema, Solution } from "../models/Solution";
import { Server } from "../../server";

export class EnvironmentController {
    public static Get (req: Request, res:  Response) {
        let token = req.headers["authorization"].replace("JWT ", "");
        let payload = jwt.verify(token ? token : "", Server.get('crypt_key'))._doc;

        SolutionSchema.findOne({user: payload}, (err, solution) => {
            if(err)
                return res.status(500).json([]);
            
            EnvironmentSchema.find({solution: solution}, (err, envs) => {
                if(err)
                    return res.status(500).json([]);
                
                res.status(200).json(envs);
            });
        });
    }

    public static Post (req: Request, res:  Response) {
        let token = req.headers['authorization'].replace("JWT ", "");
        let payload = jwt.verify(token ? token : "", Server.get('crypt_key'))._doc;

        SolutionSchema.findOne({user: payload}, (err, solution) => {
            if(!solution || err)
                return res.json({status: false, message: "Invalid solution!"});

            var env = {name: req.body.name, solution: solution._id};

            EnvironmentSchema.create(env, (err, docs) => {
                if(err) {
                    if(err.code == 11000)
                        res.json({status: false, message: "Environment already created!", code: err});
                    else
                        res.json({status: false, message: "Invalid environment!", code: err.code});
                    return;
                }

                res.json({status: true, message: "Succefuly created environment!"});
            });
        });
    };

    public static PutById (req: Request, res:  Response) {
        let env: Environment = req.body;
        if(!req.params.id || !env)
            return res.json({status: false, message: "Invalid environment!"});
        
        let token = req.headers['authorization'].replace("JWT ", "");
        let payload = jwt.verify(token ? token : "", Server.get('crypt_key'))._doc;

        SolutionSchema.find({user: payload}, (err, solution: Solution) => {
            if(!solution || err)
                return res.json({status: false, message: "Invalid solution!"});

            EnvironmentSchema.findOneAndUpdate({_id: req.params.id}, env, {upsert: true}, (err) => {
                if(err)
                    return res.json({status: false, message: "Invalid environment!"});
                
                res.json({status: true, message: "Succefuly updated environment!"});
            });
        });
    };

    public static DeleteById (req: Request, res:  Response) {
        if(!req.params.id)
            return res.json({status: false, message: "Invalid environment!"});

        let token = req.headers["authorization"].replace("JWT ", "");
        let payload = jwt.verify(token ? token : "", Server.get('crypt_key'))._doc;

        SolutionSchema.findOne({user: payload}, (err, docs: Solution) => {
            if(err || !docs)
                return res.json({status: false, message: "Invalid token!"});

            EnvironmentSchema.remove({solution: docs, _id: req.params.id}, (err, d) => {
                if(err)
                    return res.json({status: false, message: "Invalid environment!"});
                
                res.json({status: true, message: "Environment deleted!"});
            })
        });
    }
}

export class EnvironmentScheduleController {
    public static Get (req: Request, res:  Response) {
        let token = req.headers["authorization"].replace("JWT ", "");
        let payload = jwt.verify(token ? token : "", Server.get('crypt_key'))._doc;

        let env: Environment = req.body;
        if(!req.params.env || !env)
            return res.json({status: false, message: "Invalid environment!"});

        SolutionSchema.findOne({user: payload}, (err, s) => {
            if(err || !s)
                return res.status(500).json([]);
            
            EnvironmentSchema.find({solution: s, _id: req.params.env}, (e, env) => {
                if(e || !env)
                    return res.status(500).json([]);

                EnvironmentScheduleSchema.find({environment: env}, (err, schedules) => {
                    if(err)
                        return res.status(500).json([]);
                    
                    res.status(200).json(schedules);
                });
            });
        });
    }

    public static PostById (req: Request, res:  Response) {
        let env: Environment = req.body;
        if(!req.params.env || !env)
            return res.json({status: false, message: "Invalid environment!"});
        
        let token = req.headers['authorization'].replace("JWT ", "");
        let payload = jwt.verify(token ? token : "", Server.get('crypt_key'))._doc;

        SolutionSchema.find({user: payload}, (err, solution: Solution) => {
            if(!solution || err)
                return res.json({status: false, message: "Invalid solution!"});

            EnvironmentSchema.findOne({_id: req.params.env}, (err, e) => {
                if(err || !e)
                    return res.json({status: false, message: "Invalid environment!"});
                
                var b = {environment: e._id, start: new Date(req.body.start), end: new Date(req.body.end), status: true};
                EnvironmentScheduleSchema.create(b, (err, e) => {
                    if(err)
                       return res.json({status: false, message: /*"Invalid schedule!*/new Date()});
                    
                    return res.json({status: true, message: "Succefuly to add new schedule!"});
                });
            });
        });
    };

    public static DeleteById (req: Request, res:  Response) {
        if(!req.params.id || !req.params.env)
            return res.json({status: false, message: "Invalid environment schedule!"});

        let token = req.headers["authorization"].replace("JWT ", "");
        let payload = jwt.verify(token ? token : "", Server.get('crypt_key'))._doc;

        SolutionSchema.findOne({user: payload}, (err, docs: Solution) => {
            if(err || !docs)
                return res.json({status: false, message: "Invalid token!"});

            EnvironmentScheduleSchema.remove({_id: req.params.id, environment: req.params.env}, (err, d) => {
                if(err)
                    return res.json({status: false, message: "Invalid schdule!"});
                
                res.json({status: true, message: "Schedule deleted!"});
            })
        });
    }
}