module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: ['src/support/world-setup.ts', 'src/support/hooks.ts', 'src/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
      './allure-reporter.js'
    ]
  }
};
