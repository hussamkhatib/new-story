/*
Helpers are application-specific functions.

They're useful for abstracting away plumbing and other important-but-
uninteresting parts of the code, specific to this codebase.

NOTE: For generalized concerns that aren't specific to this project,
use `utils.js` instead.
*/
const os = require("os");
const path = require("path");
const fs = require("fs");

const {
  readDirPromise,
  readFilePromise,
  writeFilePromise,
  mkDirPromise,
  capitalizeFirstLetter,
} = require("./utils");

module.exports.createStoriesDir = () => {
  const sbPath = "./src/stories";
  fs.access(sbPath, (error) => {
    // To check if the given directory
    // already exists or not
    if (error) {
      // then create it
      // If current directory does not exist
      fs.mkdir(sbPath, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("New Directory created successfully !!");
        }
      });
    } else {
      console.log("Given Directory already exists !!");
    }
  });
};

const getComponentNames = async (dir) => {
  const currentPath = process.cwd();
  const home = os.homedir();
  // console.log({ home, currentPath, path });
  await readDirPromise(dir).then((files) => {
    for (const file of files) {
      const next = path.join(dir, file);

      if (fs.lstatSync(next).isDirectory() == true) {
        getComponentNames(next);
      } else {
        let [fileName, extension] = file.split(".");

        if (extension === "js") extension = "jsx";

        const componentName = capitalizeFirstLetter(fileName);
        if (
          fileName[0].toUpperCase() === fileName[0] &&
          (extension === "jsx" || extension === "tsx")
        ) {
          readFilePromise(`${currentPath}/src/templates/react.${extension}`)
            .then((template) =>
              template.replace(/COMPONENT_NAME/g, componentName)
            )
            .then((template) => {
              const fileLocation = `${currentPath}/src/stories/${componentName}.stories.tsx`;
              writeFilePromise(fileLocation, template);
            });
        }
      }
    }
  });
};
module.exports.getComponentNames = getComponentNames;
