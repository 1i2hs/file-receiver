module.exports = {
  apps : [{
    name: "media-receiver",
    script: "./app.js",
    watch: true,
    env: {
      NODE_ENV: "development",
      PORT: 3000,
      APP_NAME: "media-receiver",
      VIDEO_FILE_PREFIX: ""
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
      APP_NAME: "media-receiver",
      VIDEO_FILE_PREFIX: ""
    }
  }]
}