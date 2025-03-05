module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'summary',
      '@cucumber/pretty-formatter',
      'html:cucumber-report.html'
    ],
    parallel: 3
  }
};