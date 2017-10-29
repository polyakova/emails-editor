
module.exports = function (config) {
  config.set({

    frameworks: ["jasmine", "karma-typescript"],

    files: [
      { pattern: "base.spec.ts" },
      { pattern: "app/lib/components/*.+(ts|html)" }
    ],

    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },

    reporters: ['dots', 'karma-typescript'],

    browsers: ["Chrome"],

    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [
          require("karma-typescript-angular2-transform")
        ]
      },
      compilerOptions: {
        lib: ["ES2015", "DOM"],
        skipLibCheck: true
      }
    }
  });
};