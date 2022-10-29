/*
Utils are general building blocks. Platform-specific, but not
application-specific

They're useful for abstracting away the configuration for native methods,
or defining new convenience methods for things like working with files,
data munging, etc.

NOTE: Utils should be general enough to be useful in any Node application.
For application-specific concerns, use `helpers.js`.
*/
const fs = require("fs");
const path = require("path");

module.exports.readDirPromise = (dirLocation) =>
  new Promise((resolve, reject) => {
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
module.exports.readFilePromise = (fileLocation) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileLocation, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

module.exports.writeFilePromise = (fileLocation, fileContent) =>
  new Promise((resolve, reject) => {
    fs.writeFile(fileLocation, fileContent, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

module.exports.mkDirPromise = (dirPath) =>
  new Promise((resolve, reject) => {
    fs.mkdir(dirPath, (err) => {
      err ? reject(err) : resolve();
    });
  });

module.exports.accessPromise = (fileLocation) =>
  new Promise((resolve, reject) => {
    fs.access(fileLocation, (err) => {
      err ? reject(err) : resolve();
    });
  });

module.exports.capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

module.exports.readFilePromiseRelative = (fileLocation) =>
  module.exports.readFilePromise(path.join(__dirname, fileLocation));


  