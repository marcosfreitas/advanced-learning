import { readFile } from 'fs/promises';
import { Errors } from './errors.js';

export class File {

    static defaults = {
      expected: {
        maxFileLines: 4,
        fields: ['id', 'name', 'profession', 'age']
      }
    }

    static async asyncLoadFile(filePath) {
      return readFile(filePath, 'utf-8');
    }

    /**
     * @throws Error
     */
    static checkValidCsv(csvString) {
        if (!csvString) {
            throw new Error(Errors.FILE_EMPTY);
        }

        const lines = csvString.split('\n');
        const header = lines[0].split(',');
        const content = lines.slice(1);

         // header identified fields
        if (header.join(',') !== File.defaults.expected.fields.join(',')) {
            throw new Error(Errors.INVALID_HEADER_ATTRIBUTES);
        }

        // file content length
        if (!lines || !content.length || content.length > File.defaults.expected.maxFileLines) {
            throw new Error(Errors.CONTENT_LENGTH);
        }

        // file line: quantity of fields per line
        lines.forEach((lineString, index) => {
            const line = lineString.split(',');

            if (line.length !== File.defaults.expected.fields.length) {
                throw new Error(Errors.INVALID_CONTENT);
            }
        });

        return true;
    }

    static parseCsvToJson(content) {
        const lines = content.split('\n');
        const header = lines.shift().split(',');

        const data = [];
        lines.forEach((lineString, index) => {
            const line = lineString.split(',');
            const obj = {};

            File.defaults.expected.fields.forEach((field, index) => {
                obj[field] = line[index];
            });

            data.push(obj);
        });

        return data;

    }

    static async csvToJson(filePath) {
        const content = await File.asyncLoadFile(filePath);

        File.checkValidCsv(content);

        return File.parseCsvToJson(content);
    }
}
