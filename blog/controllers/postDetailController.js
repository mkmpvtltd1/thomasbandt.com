var routes = require("../../routes"),
    data = require("../../data"),
    moment = require("moment");

module.exports = {
    init: init
};

function init(app) {
    app.get(routes.blog.postDetail, function(request, response) {
        var slug = request.url.substring(1, request.url.length);

        if (slug.indexOf("?") > -1) {
            slug = slug.substring(0, slug.indexOf("?"));
        }

        data.posts.findOneBySlug(slug)
            .then(function(post) {
                if (post.published) {
                    post.dateFormatted = moment(post.date).format("MMMM Do YYYY");

                    app.renderBlogView(response, "postDetail", {
                        post: post
                    });
                } else {
                    app.render404(response);
                }
            })
            .catch(function() {
                app.render404(response);
            });
    });
}
