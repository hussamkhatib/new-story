/*
Utils are general building blocks. Platform-specific, but not
application-specific

They're useful for abstracting away the configuration for native methods,
or defining new convenience methods for things like working with files,
data munging, etc.

NOTE: Utils should be general enough to be useful in any Node application.
For application-specific concerns, use `helpers.js`.
*/
import fs from "fs";

export const readDirPromise = (dirLocation: string) =>
  new Promise<string[]>((resolve, reject) => {
    fs.readdir(dirLocation, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

// Simple promise wrappers for read/write files.
// utf-8 is assumed.
export const readFilePromise = (fileLocation: string) =>
  new Promise<string>((resolve, reject) => {
    fs.readFile(fileLocation, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

export const writeFilePromise = (fileLocation: string, fileContent: string) =>
  new Promise<void>((resolve, reject) => {
    fs.writeFile(fileLocation, fileContent, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

export const mkDirPromise = (dirPath: string) =>
  new Promise<void>((resolve, reject) => {
    fs.mkdir(dirPath, (err) => {
      err ? reject(err) : resolve();
    });
  });

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
