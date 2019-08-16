module.exports = {
  apps : [{
    name: "file-receiver",
    script: "./app.js",
    watch: false,
    env: {
      NODE_ENV: "development",
      PORT: 3000,
      APP_NAME: "file-receiver",
      VIDEO_FILE_NAME_PREFIX: "",
      FILE_UPLOAD_DESTINATION: "uploaded" 
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
      APP_NAME: "file-receiver",
      VIDEO_FILE_NAME_PREFIX: "",
      FILE_UPLOAD_DESTINATION: "uploaded"
    }
  }]
}