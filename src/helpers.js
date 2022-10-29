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

const templatePath = `./templates/react.tsx`;

const {
  readDirPromise,
  readFilePromise,
  writeFilePromise,
  mkDirPromise,
  accessPromise,
  readFilePromiseRelative,
  capitalizeFirstLetter,
} = require("./utils");

module.exports.createStoriesDir = () => {
  const sbPath = "./stories";

  accessPromise(sbPath)
    .then(() => {
      console.log("Stories directory already exists.");
    })
    .catch(() => {
      mkDirPromise(sbPath)
        .then(() => {
          console.log("Stories directory created.");
        })
        .catch((err) => {
          console.log("Error creating stories directory: ", err);
        });
    })
    .then(() => {
      const currentPath = process.cwd();

      glob("**/*[^.].tsx", {}, function (er, files) {
        files.forEach((file) => {
          if (file === "src/templates/react.tsx") return;
          const fileName = path.basename(file, ".tsx");
          console.log(fileName);
          /**
           * // FIXME: Remove files like ComponentName.stories.tsx, ComponentName.types.tsx
           * Refactor to use regex
           * */
          if (fileName.includes(".")) return;
          // TODO: handle index files
          const componentName = capitalizeFirstLetter(fileName);
          const componentPath = path.join(currentPath, file);
          // console.log(componentName, componentPath);
          const storyPath = path.join(
            currentPath,
            "stories",
            `${fileName}.stories.tsx`
          );
          // console.log(storyPath);
          readFilePromiseRelative(templatePath)
            .then((template) =>
              template.replace(/COMPONENT_NAME/g, componentName)
            )
            .then((template) => {
              writeFilePromise(storyPath, template);
            });
        });
      });
    });
};
