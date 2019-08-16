# file-receiver
A simple node.js application that receives file uploads from client side. It uses [`multer`](https://github.com/expressjs/multer) to recevie files. Also it is recommended to run this application with [`PM2`](http://pm2.keymetrics.io/)

## Compatible Node.js version
\>= 10.14.0(LTS)

## Installation
1. Clone the repository in your local environment.
2. run the following command to install node modules: 
```
$ npm install
```
3. make a directory named `uploaded`(default directory where uploaded files are saved) in the root directory.
4. (Optional) Fill in `ecosystem.config.js` file which stays in a root directory. The detail about the file is written in later of this section.

## Run the application
Run the following command to run the application:
```
pm2 start ecosystem.config.js
```
For production environment:
```
pm2 start ecosystem.config.js --env production
```
For more details about managing the application with PM2, please refer to [here](http://pm2.keymetrics.io/)

## Configuration
Configuration can be changed by modifying ecosystem.config.js file. The file is PM2's configuration file. You can check details about it in [here](http://pm2.keymetrics.io/docs/usage/application-declaration/). The default template for the file is:
```javascript
module.exports = {
  apps : [{
    name: "media-receiver", // name of the application
    script: "./app.js", // main node.js file to run
    watch: false, // enable watch & restart feature, if a file change in the folder or subfolder, your app will get reloaded 
    env: { // node environemnt value that can be read by process.env for development environment
      NODE_ENV: "development",
      PORT: 3000, // port number to open(process.env.PORT)
      APP_NAME: "media-receiver", // name of the application(process.env.APP_NAME)
      VIDEO_FILE_NAME_PREFIX: "", // when a video file is received from the client, it will be named with this value.
      FILE_UPLOAD_DESTINATION: "uploaded"
    },
    env_production: { // production environment
      NODE_ENV: "production",
      PORT: 3000,
      APP_NAME: "media-receiver",
      VIDEO_FILE_NAME_PREFIX: "",
      FILE_UPLOAD_DESTINATION: "uploaded"
    }
  }]
}
```

## Uploaded file naming pattern
The patter is like:
`<process.ev.VIDEO_FILE_NAME_PREFIX>-<timestamp-in-miliseconds>.<extension-name>`

e.g. if the `VIDEO_FILE_NAME_PREFIX` is configured as "video" and the extension of the file is `mp4`, the the name will be like: `video-1565950538337.mp4`