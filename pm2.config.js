module.exports = {
    apps : [
        {
          name: "weather_api",
          script: "./index.js",
          watch: true,
          autorestart: true,
          env: {
              "PORT": 4000,
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 4000,
              "NODE_ENV": "production",
          }
        }
    ]
  }