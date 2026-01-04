const { AllureRuntime } = require("allure-js-commons");
const { CucumberJSAllureFormatter } = require("allure-cucumberjs");

class AllureReporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(
      options,
      new AllureRuntime({ resultsDir: "./allure-results" }),
      {
        labels: [
          {
            pattern: [/@epic:(.*)/],
            name: "epic",
          },
          {
            pattern: [/@feature:(.*)/],
            name: "feature",
          },
          {
            pattern: [/@severity:(.*)/],
            name: "severity",
          },
        ],
      }
    );
  }
}

module.exports = AllureReporter;
