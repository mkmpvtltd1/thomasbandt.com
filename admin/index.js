var config = require("../config"),
    routes = require("../routes"),
    controllers = require("./controllers"),
    userValidator = require("./services/userValidator");

module.exports = {
    init: init,
    services: {
        userValidator: userValidator
    }
};

function init(app) {
    configureAuthentication(app);

    controllers.init(app);
}

function configureAuthentication(app) {
    var passport = require("passport");
    var LocalStrategy = require("passport-local").Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        function(username, password, done) {
            userValidator.validateLogin(username, password).done(
                function(result) {
                    if (result.errorMessage) {
                        done(null, false, { message: result.errorMessage });
                    } else {
                        done(null, result.user);
                    }
                },
                function(error) {
                    done(error);
                }
            );
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, "admin");
    });

    passport.deserializeUser(function(user, done) {
        done(null, "admin");
    });

    app.use("/admin", function(request, response, next) {
        if (!authenticateAdminRequest(request)) {
            response.redirect(routes.admin.login);
            return;
        }

        request.app.locals.isAuthenticated = request.isAuthenticated();
        next();
    });

    function authenticateAdminRequest(request) {
        if (request.isAuthenticated())
            return true;

        var url = request.originalUrl;
        var isClientAssetRequest = url.substring(0, 13) === "/admin/client";

        if (isClientAssetRequest)
            return true;

        // Allow only login page to be accessed
        return url == routes.admin.login;
    }
}
