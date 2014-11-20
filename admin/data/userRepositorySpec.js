"use strict";

var should = require("should");

describe("UserRepository", function() {
    describe("When calling getAdminUser()", function() {
        var _userRepository;

        before(function() {
            _userRepository = require("./userRepository");
        })

        it("returns the admin user with its name", function() {
            _userRepository.getAdminUser().then(function(user) {
                user.userName.should.equal("admin");
            })
        });

        it("returns the admin user with its hashed password", function() {
            _userRepository.getAdminUser().then(function(user) {
                user.hashedPassword.length.should.be.greaterThan(0);
            })
        })
    });
});

