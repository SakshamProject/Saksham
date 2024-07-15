module.exports = {
  apps: [
    {
      name: 'saksham-backend',
      script: './build/index.js',
      interpreter: '/home/ubuntu/.nvm/versions/node/v16.20.1/bin/node',
      node_args: '--max-http-header-size=81000 --tls-min-v1.0',
      exec_mode: 'cluster',
    },
  ],
};
