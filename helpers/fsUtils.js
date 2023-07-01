const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const readFromFile = async (file) => {
  try {
    const data = await readFile(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

const writeToFile = async (destination, content) => {
  try {
    await writeFile(destination, JSON.stringify(content, null, 4));
    console.info(`\nData written to ${destination}`);
  } catch (err) {
    console.error(err);
  }
};

const readAndAppend = async (content, file) => {
  try {
    const data = await readFromFile(file);
    const parsedData = Array.isArray(data) ? data : [];
    parsedData.push(content);
    await writeToFile(file, parsedData);
  } catch (err) {
    console.error(err);
  }
};

const readAndOverwrite = async (content, file) => {
  try {
    await writeToFile(file, content);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  readFromFile,
  readAndAppend,
  readAndOverwrite
};
