#!/usr/bin/env node
const { Command, Option } = require("commander");
const program = new Command();
const { createStoriesDir, logError } = require("./helpers");

program
  .command("stories")
  .description("Create boilerplate stories for all components")
  .addOption(
    new Option("-t, --template <name>", "template name").choices(["react"])
  )
  .action((arg) => {
    if (!arg.template) {
      logError("Template name is required.");
      process.exit(0);
    }
    createStoriesDir();
  });

program.parse();
