// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./app.js",
      instances: "max",     // runs one per CPU core
      exec_mode: "cluster", // enables load balancing
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
