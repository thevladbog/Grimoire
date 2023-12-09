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
    }),
  ],

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
