import * as express from "express";
import * as passport from "passport";

import { UserController } from "../controllers/UserController";
import { EnvironmentController, EnvironmentScheduleController } from "../controllers/EnvironmentController";

export const Router = (app: express.Application) => {

    app.route("/api/login")
        .post(UserController.Login);

    app.route("/api/register")
        .post(UserController.Register);
    
    app.route("/api/environment")
        .get(passport.authenticate('jwt', {sessions: false}), EnvironmentController.Get)
        .post(passport.authenticate('jwt', {sessions: false}), EnvironmentController.Post);
    
    app.route("/api/environment/:id")
        .put(passport.authenticate('jwt', {sessions: false}), EnvironmentController.PutById)
        .delete(passport.authenticate('jwt', {sessions: false}), EnvironmentController.DeleteById);

    app.route("/api/environment/:env/schedule")
        .get(passport.authenticate('jwt', {sessions: false}), EnvironmentScheduleController.Get)
        .post(passport.authenticate('jwt', {sessions: false}), EnvironmentScheduleController.PostById);
    
    app.route("/api/environment/:env/schedule/:id")
        .delete(passport.authenticate('jwt', {sessions: false}), EnvironmentScheduleController.DeleteById)

    app.get('/*', function(req, res)
    {
        res.status(404);
    });
}