import * as jwt from "jsonwebtoken";

import { UserSchema } from "../models/User";
import { Server } from "../../server";
import { SolutionSchema, Solution } from "../models/Solution";

export class UserController {
    public static Login (req, res) {
        UserSchema.findOne({email: req.body.email}, function(err, user) {
            if(err) {
                console.log("Error at Login on UserController");
                res.json({success: false, message: 'Invalid email'});
                return;
            }

            if(!user)
                res.json({success: false, message: 'Invalid email'});
            else {
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if(isMatch && !err)
                    {
                        let sName: string;
                        SolutionSchema.findOne({_id: user.solution}, (err, solution: Solution) => {
                            if(err || !solution) return;
                            sName = solution.name;
                        });

                        var expiresTime = req.body.remember == true ? 160800 : 60000;

                        var token = jwt.sign(user, Server.get('crypt_key'), { expiresIn: expiresTime });
                        var json = {solution: user.solution, solutionName: user.fullName, email: user.email, token: 'JWT ' + token};

                        res.json(json);
                    }
                    else
                        res.json({success: false, message: 'Invalid password'});
                });
            }
        });
    }

    public static Register (req, res) {
        SolutionSchema.find({_id: req.body.solution}, (err, solution) => {
            if(solution.length == 0 || err) {
                res.json({status: false, message: "Invalid solution!"});
                return;
            }

            UserSchema.create(req.body, function(err, docs) {
                if(err) {
                    if(err.code == 11000)
                        res.json({success: false, message: 'That email address already exits!'});
                    else
                        res.json({success: false, message: 'Invalid email or password!'});
                    return;
                }

                res.json({success: true, message: 'Successfuly created new user'});
            });
        });
    }
}