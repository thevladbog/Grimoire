module.exports = {
  apps: [
    {
      name: 'sins',
      script: './dist/main.js',
      cwd: '/home/bot_cerberus/data/www/sins.v-b.tech/',
      instances: 'max',
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'dev',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
