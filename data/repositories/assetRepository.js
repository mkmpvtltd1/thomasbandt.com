var _ = require("underscore"),
    q = require("q"),
    config = require("../../config"),
    path = require("path"),
    fs = require("fs");

module.exports = {
    all: getAllFiles
};

function getAllFiles() {
    var deferred = q.defer();

    fs.readdir(config.assets.uploadFolder, function(error, filePaths) {
        var statPromises = [];

        _.forEach(filePaths, function(filePath) {
            statPromises.push(getFileStats(filePath));
        });

        q.allSettled(statPromises).done(function(results) {
            var files = [];

            results.forEach(function(result) {
               files.push(result.value);
            });

            deferred.resolve(files);
        });
    });

    return deferred.promise;
}

function getFileStats(filePath) {
    var deferred = q.defer();

    fs.stat(config.assets.uploadFolder + filePath, function(error, stats) {
        deferred.resolve({
            name: filePath,
            size: stats.size,
            created: stats.ctime
        })
    });

    return deferred.promise;
}
