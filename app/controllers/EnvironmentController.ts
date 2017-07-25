import * as jwt from "jsonwebtoken";

import { Request, Response } from 'express';
import { Environment, EnvironmentSchema } from "../models/Environment";
import { SolutionSchema, Solution } from "../models/Solution";
import { Server } from "../../server";

export class EnvironmentController {
    public static Get (req: Request, res:  Response) {
        let token = req.headers["authorization"].replace("JWT ", "");
        let payload = jwt.verify(token ? token : "", Server.get('crypt_key'))._doc;

        SolutionSchema.findOne({user: payload})
        .then(s => {
            EnvironmentSchema.find({solution: s})
            .then(env => {
                res.status(200).json(env);
            })
            .catch(err => {
                res.status(500).json([]);
            });
        })
        .catch(err => {
            res.status(500).json([]);
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