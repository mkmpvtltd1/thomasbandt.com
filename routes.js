var routes = {
    admin: {
        addPost: "/admin/posts/add",
        editPost: "/admin/posts/edit/:id",
        deletePost: "/admin/posts/delete/:id",
        login: "/admin/login",
        logout: "/admin/logout",
        overview: "/admin/posts"
    },
    blog: {
        home: "/"
    }
};

module.exports = routes;
