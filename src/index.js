#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { createStories, createStory, logError } = require("./helpers");

program
  .command("stories")
  .description("Create boilerplate stories for all components")
  .action(() => {
    createStories();
  });

program
  .command("story")
  .description("Create story for a single component")
  .option("-f, --file <pathToFile>", "file name")
  .option("-p, --props <todo>", "pipe separated props")
  .action((args) => {
    if (!args.file) {
      logError("File name is required.");
      process.exit(0);
    }
    // TODO: chekc if stories file is entered
    const filePath = `${process.env.INIT_CWD}/${args.file}`;
    createStory({
      fullPath: filePath,
      pathFromFlag: args.file,
      props: args.props,
    });
  });

program.parse();
