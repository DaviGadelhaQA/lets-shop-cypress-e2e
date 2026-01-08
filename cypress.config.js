const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://rahulshettyacademy.com',
    specPattern: 'cypress/e2e/**/*.spec.js',
    experimentalSessionAndOrigin: true,
  },
});
