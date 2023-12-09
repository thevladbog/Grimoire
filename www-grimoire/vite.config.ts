import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin('all'),
    sentryVitePlugin({
      org: 'v-b',
      project: 'grimoire',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],

  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },

  resolve: {
    alias: {
      src: '/src',
    },
  },

  build: {
    sourcemap: true,
  },
});
