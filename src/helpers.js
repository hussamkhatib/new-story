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

const templatePath = (extension) => `./templates/react.${extension}`;

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

const removeFileNameFromDir = (filePath) =>
  filePath.split("/").slice(0, -1).join("/");
module.exports.removeFileNameFromDir = removeFileNameFromDir;

module.exports.createStoriesDir = () => {
  const currentPath = process.cwd();

  glob(
    "**/*(*(*.)tsx|*(*.)jsx)",
    {
      ignore: [
        "**/node_modules/**",
        "**/*.*.@(js|jsx|ts|tsx)",
        "src/templates/**",
      ],
    },
    function (er, files) {
      files.forEach((file) => {
        const getFile = path.basename(file);
        const [fileName, extension] = getFile.split(".");
        /**
         *  Remove files like badCasingComponentName.tsx
         * // FIXME: Refactor to use regex
         * */
        if (fileName[0].toUpperCase() !== fileName[0]) return;
        // TODO: handle index files
        const componentName = capitalizeFirstLetter(fileName);
        const componentPath = removeFileNameFromDir(
          path.join(currentPath, file)
        );

        const storyPath = path.join(
          componentPath,
          `${componentName}.stories.${extension}`
        );
        readFilePromiseRelative(templatePath(extension))
          .then((template) =>
            template.replace(/COMPONENT_NAME/g, componentName)
          )
          .then((template) => {
            writeFilePromise(storyPath, template);
          });
      });
    }
  );
};

module.exports.logError = (error) => {
  console.info("\n");
  console.info(chalk.bold.rgb(...colors.red)("Error creating Stories."));
  console.info(chalk.rgb(...colors.red)(error));
  console.info("\n");
};
