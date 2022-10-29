/*
Helpers are application-specific functions.

They're useful for abstracting away plumbing and other important-but-
uninteresting parts of the code, specific to this codebase.

NOTE: For generalized concerns that aren't specific to this project,
use `utils.js` instead.
*/
import os from "os";
import fs from "fs";
import path from "path";

import {
  readDirPromise,
  readFilePromise,
  writeFilePromise,
  mkDirPromise,
  capitalizeFirstLetter,
} from "./utils";

export const getConfig = () => {
  const home = os.homedir();
  const currentPath = process.cwd();
  readDirPromise(`${currentPath}/src/ui`).then((files) => {
    for (const file of files) {
      //   if (file.isFile());
      // @ts-ignore
    }
  });
  readFilePromise(`${currentPath}/src/templates/react.tsx`)
    .then((template) => {
      const Alert = template.replace(/COMPONENT_NAME/g, "Alert");
      return Alert;
    })
    .then((template) => {
      const fileLocation = `${currentPath}/src/templates/react.tsx`;
      writeFilePromise(fileLocation, template);
    });

  return { home, currentPath };
};

// recursive function to get all files in a directory
export const getComponentNames = async (dir: string) => {
  console.log({ dir });

  const currentPath = process.cwd();

  await readDirPromise(dir).then((files) => {
    for (const file of files) {
      const next = path.join(dir, file);

      if (fs.lstatSync(next).isDirectory() == true) {
        getComponentNames(next);
      } else {
        const [fileName, extension] = file.split(".");
        const componentName = capitalizeFirstLetter(fileName);
        if (extension === "tsx") {
          readFilePromise(`${currentPath}/src/templates/react.tsx`)
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

export const filterComponents = (files: string[]) => {
  const filteredFiles = files.filter((file) => {
    return file.includes(".tsx");
  });

  return filteredFiles;
};
