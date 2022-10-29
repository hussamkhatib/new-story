#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { getComponentNames, createStoriesDir } = require("./helpers");

program
  .command("make-story")
  .description("Make a story")
  .version("0.0.13")
  .action(() => {
    createStoriesDir();
    getComponentNames();
  });

program.parse();
