module.exports = {
    apps : [
        {
          name: "weather_api",
          script: "./index.js",
          watch: true,
          autorestart: true,
          env: {
              "PORT": 2052,
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 2052,
              "NODE_ENV": "production",
          }
        }
    ]
  }