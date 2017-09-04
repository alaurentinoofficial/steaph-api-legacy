var passport = require("passport");
var UserController_1 = require("../controllers/UserController");
var EnvironmentController_1 = require("../controllers/EnvironmentController");
exports.Router = function (app) {
    app.route("/api/login")
        .post(UserController_1.UserController.Login);
    app.route("/api/register")
        .post(UserController_1.UserController.Register);
    app.route("/api/environment")
        .get(passport.authenticate('jwt', { sessions: false }), EnvironmentController_1.EnvironmentController.Get)
        .post(passport.authenticate('jwt', { sessions: false }), EnvironmentController_1.EnvironmentController.Post);
    app.route("/api/environment/:id")
        .put(passport.authenticate('jwt', { sessions: false }), EnvironmentController_1.EnvironmentController.PutById)
        .delete(passport.authenticate('jwt', { sessions: false }), EnvironmentController_1.EnvironmentController.DeleteById);
    app.route("/api/environment/:env/schedule")
        .get(passport.authenticate('jwt', { sessions: false }), EnvironmentController_1.EnvironmentScheduleController.Get)
        .post(passport.authenticate('jwt', { sessions: false }), EnvironmentController_1.EnvironmentScheduleController.PostById);
    app.route("/api/environment/:env/schedule/:id")
        .delete(passport.authenticate('jwt', { sessions: false }), EnvironmentController_1.EnvironmentScheduleController.DeleteById);
    app.get('/*', function (req, res) {
        res.status(404);
    });
};
