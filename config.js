var config = {
    admin: {
        credentials: {
            userName: "admin",
            hashedPassword: "$2a$10$l69mRxfKt2C3FV19vzSFbucJVn43cEE8mPwz9CAIdRxNsrpwb5Khi"
        }
    },
    assets: {
        uploadFolder: "/upload"
    },
    database: {
        connectionString: "mongodb://localhost:27017/node-simple-blog",
        databaseName: "node-simple-blog"
    },
    debug: {
        database: {
            connectionString: "mongodb://localhost:27017/node-simple-blog-dev",
            databaseName: "node-simple-blog-dev"
        }
    },
    metadata: {
        blogName: "Simpe Blog"
    }
};

module.exports = config;
