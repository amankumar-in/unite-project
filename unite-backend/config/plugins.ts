module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET", "e8lBEkQp4BDBRUH99bChcA=="),
    },
  },
});
