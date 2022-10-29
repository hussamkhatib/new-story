#!/usr/bin/env node
const { Command, Option } = require("commander");
const program = new Command();
const { createStoriesDir, logError } = require("./helpers");

program
  .command("make-story")
  .description("Make a story")
  .addOption(
    new Option("-t, --template <name>", "template name").choices(["react-ts"])
  )
  .action((arg) => {
    if (!arg.template) {
      logError("Template name is required.");
      process.exit(0);
    }
    createStoriesDir();
  });

program.parse();
