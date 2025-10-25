module.exports = {
  apps: [
    {
      name: 'portfolio-backend',
      cwd: './server',
      script: 'node',
      args: 'src/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
    {
      name: 'portfolio-frontend',
      script: 'npx',
      args: 'serve dist --single --listen 4173',
      cwd: '.',
      env: {
        NODE_ENV: 'production',
      },
      autorestart: true,
    },
  ],
};
