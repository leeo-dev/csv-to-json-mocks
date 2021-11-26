const { join } = require("path");
const { readFile } = require("fs/promises");
const { error } = require("./constants");
const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};
class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    return content;
  }

  static async getFileContent(filePath) {
    const file = await join(__dirname, filePath);
    return (await readFile(file)).toString("utf-8");
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split("\n");
    const isHeaderValid = header === options.fields.join(",");
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
  }
}
(async () => {
  // const result = await File.csvToJson("../mocks/emptyFile-invalid.csv");
  // const result = File.csvToJson("../mocks/fourItems-invalid.csv");
  const result = File.csvToJson("../mocks/invalid-header.csv");
  // const result = File.csvToJson("../mocks/threeItems-valid.csv");
  console.log(result);
})();
