import { defineConfig } from 'cypress';
import { setConfig } from 'next/config';
import config from './next.config';

setConfig(config);
export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1020,

  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
    baseUrl: 'http://localhost:3000',
    supportFile: false,
  },

  component: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },

    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
