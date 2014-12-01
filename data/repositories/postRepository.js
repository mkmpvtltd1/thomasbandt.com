var q = require("q"),
    BlogPost = require("../models/blogPost");

module.exports = {
    find: findPost,
    save: savePost
};

function findPost(id) {
    var deferred = q.defer();

    BlogPost.findById(id, function (error, post) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(post);
        }
    })

    return deferred.promise;
}

function savePost(post) {
    var databasePost = new BlogPost({
        title: post.title,
        abstract: post.abstract,
        content: post.content,
        contentHtml: post.contentHtml,
        published: post.published
    });

    var deferred = q.defer();

    databasePost.save(function (error, result) {
        if (error) {
            deferred.reject(error);
            return;
        }

        post.id = result.id;
        deferred.resolve(post);
    });

    return deferred.promise;
}
