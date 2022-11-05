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

const {
  readFilePromise,
  writeFilePromise,
  readFilePromiseRelative,
  capitalizeFirstLetter,
  splitStr,
} = require("./utils");

const colors = {
  red: [216, 16, 16],
  green: [142, 215, 0],
  blue: [0, 186, 255],
  gold: [255, 204, 0],
  mediumGray: [128, 128, 128],
  darkGray: [90, 90, 90],
};

const logError = (error) => {
  console.info("\n");
  console.info(chalk.bold.rgb(...colors.red)("Error creating Stories."));
  console.info(chalk.rgb(...colors.red)(error));
  console.info("\n");
};

module.exports.logError = logError;

const logItemCompletion = (successText) => {
  const checkmark = chalk.rgb(...colors.green)("✓");
  console.info(`${checkmark} ${successText}`);
};
module.exports.logItemCompletion = logItemCompletion;

const logConclusion = () => {
  console.info("\n");
  console.info(chalk.bold.rgb(...colors.green)("Stories created! 🚀 "));
  console.info(chalk.rgb(...colors.mediumGray)("Thanks for using new-story."));
  console.info("\n");
};

const removeFileNameFromDir = (filePath) =>
  filePath.split("/").slice(0, -1).join("/");
module.exports.removeFileNameFromDir = removeFileNameFromDir;

module.exports.createStories = () => {
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
    function (err, files) {
      if (err) {
        logError(err);
        process.exit(0);
      }
      files.forEach((file) => {
        const getFile = path.basename(file);
        const [fileName, extension] = getFile.split(".");
        /**
         *  Remove files like badCasingComponentName.tsx
         * // FIXME: Refactor to use regex
         * */
        if (fileName[0].toUpperCase() !== fileName[0]) return;
        // TODO: handle index files
        const componentPath = removeFileNameFromDir(
          path.join(currentPath, file)
        );

        const storyPath = path.join(
          componentPath,
          `${fileName}.stories.${extension}`
        );
        readFilePromiseRelative(templatePath(extension))
          .then((template) => template.replace(/COMPONENT_NAME/g, fileName))
          .then((template) => {
            writeFilePromise(storyPath, template);
          })
          .catch((err) => console.error(err));
      });
      logConclusion();
    }
  );
};

module.exports.createStory = ({
  fullPath,
  pathFromFlag,
  props = undefined,
}) => {
  const getFile = path.basename(fullPath);
  const [fileName, _, extension] = getFile.split(".");
  const storyWrapper = `export const PROP_NAME = () => <div className="space-x-4">STORIES</div>;`;
  const story = `<COMPONENT_NAME PROP_KEY_PAIR />`;

  if (fs.existsSync(pathFromFlag)) {
    if (!props) {
      logError(
        "File already exists, You need to pass props you add stories on top of it."
      );
      process.exit(0);
    }
    readFilePromise(fullPath)
      .then((fileData) => {
        const [key, value] = splitStr(props, "=");
        const values = value.split(",");
        let stories = "";
        for (const val of values) {
          const newStory = story
            .replace(/PROP_KEY_PAIR/g, `${key}="${val}"`)
            .replace(/COMPONENT_NAME/g, fileName);
          stories += newStory;
        }
        const finalSb = storyWrapper
          .replace(/STORIES/g, stories)
          .replace(/PROP_NAME/g, capitalizeFirstLetter(key));
        fileData += finalSb;
        return fileData;
      })
      .then((fileData) => {
        writeFilePromise(fullPath, fileData);
      })
      .then(() => {
        logConclusion();
      })
      .catch((err) => console.error(err));
  } else {
    readFilePromiseRelative(templatePath(extension))
      .then((template) => template.replace(/COMPONENT_NAME/g, fileName))
      .then((template) => {
        if (!props) return template;

        const [key, value] = splitStr(props, "=");
        const values = value.split(",");
        let stories = "";
        for (const val of values) {
          const newStory = story
            .replace(/PROP_KEY_PAIR/g, `${key}="${val}"`)
            .replace(/COMPONENT_NAME/g, fileName);

          stories += newStory;
        }
        const finalSb = storyWrapper
          .replace(/STORIES/g, stories)
          .replace(/PROP_NAME/g, capitalizeFirstLetter(key));
        template += finalSb;
        return template;
      })
      .then((template) => {
        writeFilePromise(fullPath, template);
      })
      .then(() => {
        logConclusion();
      })
      .catch((err) => console.error(err));
  }
};
