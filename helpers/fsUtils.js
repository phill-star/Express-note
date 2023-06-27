const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

const readAndAppend = async (content, file) => {
    try {
      const data = await readFromFile(file);
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      await writeToFile(file, parsedData);
      console.info(`\nData appended to ${file}`);
    } catch (err) {
      console.error(err);
    }
  };
  
  const readAndOverwrite = async (content, file) => {
    try {
      await writeToFile(file, content);
      console.info(`\nData overwritten in ${file}`);
    } catch (err) {
      console.error(err);
    }
  };
  
  module.exports = {
    readFromFile,
    readAndAppend,
    readAndOverwrite
  };
  