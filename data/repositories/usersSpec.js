var expect = require("chai").expect;

describe("UserRepository", function() {
    describe("When calling getAdminUser with the correct credentials", function() {
        var sut;

        before(function() {
            sut = require("./users");
        });

        it("returns the admin user with its name", function(done) {
            sut.getAdminUser().done(function(user) {
                expect(user.userName).to.be.equal("admin");
                done();
            }, done);
        });

        it("returns the admin user with its hashed password", function(done) {
            sut.getAdminUser().done(function(user) {
                expect(user.hashedPassword.length).to.be.greaterThan(0);
                done();
            }, done);
        });
    });
});
