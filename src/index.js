#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { getConfig, getComponentNames } = require("./helpers");

// program
//   .command("split")
//   .description("Split a string into substrings and display as an array")
//   .argument("<string>", "string to split")
//   .option("--first", "display just the first substring")
//   .option("-s, --separator <char>", "separator character", ",")
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//   });

program
  .command("make-story")
  .description("Make a story")
  .action(async (dir) => {
    const files = await getComponentNames(__dirname);
    console.log("---------------------------");
    console.log(files);
    console.log("---------------------------");
  });

program.parse();
