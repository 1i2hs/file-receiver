module.exports = {
  apps : [{
    name: "media-receiver",
    script: "./app.js",
    watch: false,
    env: {
      NODE_ENV: "development",
      PORT: 3000,
      APP_NAME: "media-receiver",
      VIDEO_FILE_NAME_PREFIX: ""
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
      APP_NAME: "media-receiver",
      VIDEO_FILE_NAME_PREFIX: ""
    }
  }]
}