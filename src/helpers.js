/*
Helpers are application-specific functions.

They're useful for abstracting away plumbing and other important-but-
uninteresting parts of the code, specific to this codebase.

NOTE: For generalized concerns that aren't specific to this project,
use `utils.js` instead.
*/
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const chalk = require("chalk");

const templatePath = `./templates/react.tsx`;

const colors = {
  red: [216, 16, 16],
  green: [142, 215, 0],
  blue: [0, 186, 255],
  gold: [255, 204, 0],
  mediumGray: [128, 128, 128],
  darkGray: [90, 90, 90],
};

const {
  readDirPromise,
  readFilePromise,
  writeFilePromise,
  mkDirPromise,
  accessPromise,
  readFilePromiseRelative,
  capitalizeFirstLetter,
} = require("./utils");

const templateDirPath = "src/templates/";

const removeFileNameFromDir = (filePath) =>
  filePath.split("/").slice(0, -1).join("/");
module.exports.removeFileNameFromDir = removeFileNameFromDir;

module.exports.createStoriesDir = () => {
  const currentPath = process.cwd();
  const filesInTemplateDir = ["react.tsx", "react.jsx"].map((file) =>
    path.join(templateDirPath, file)
  );

  glob("**/*.tsx", {}, function (er, files) {
    files.forEach((file) => {
      // filter out template files
      if (filesInTemplateDir.includes(file)) return;
      const fileName = path.basename(file, ".tsx");
      /**
       *  Remove files like ComponentName.stories.tsx, ComponentName.types.tsx
       * // FIXME: Refactor to use regex
       * */
      if (fileName.includes(".")) return;
      // TODO: handle index files
      const componentName = capitalizeFirstLetter(fileName);
      const componentPath = removeFileNameFromDir(path.join(currentPath, file));

      const storyPath = path.join(componentPath, `${fileName}.stories.tsx`);
      // console.log(storyPath);
      readFilePromiseRelative(templatePath)
        .then((template) => template.replace(/COMPONENT_NAME/g, componentName))
        .then((template) => {
          writeFilePromise(storyPath, template);
        });
    });
  });
};

module.exports.logError = (error) => {
  console.info("\n");
  console.info(chalk.bold.rgb(...colors.red)("Error creating Stories."));
  console.info(chalk.rgb(...colors.red)(error));
  console.info("\n");
};
