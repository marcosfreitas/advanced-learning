// for new es modules we need to add .js extension

import { Errors } from "../src/errors.js";
import { File } from "../src/file.js"
import assert from 'node:assert';

// IFEE - Immediately Invoked Function Expression
;(async () => {

    // independent test cases
    // each block has its own scope
    {
        const filePath = './__mocks__/empty-file-invalid.csv';
        const expectedError = new Error(Errors.FILE_EMPTY)
        const result = File.csvToJson(filePath);

        await assert.rejects(result, expectedError);
    }

    {
        const filePath = './__mocks__/invalid-header.csv';
        const expectedError = new Error(Errors.INVALID_HEADER_ATTRIBUTES)
        const result = File.csvToJson(filePath);

        await assert.rejects(result, expectedError);
    }


    {
        const filePath = './__mocks__/empty-file-content.csv';
        const expectedError = new Error(Errors.CONTENT_LENGTH)
        const result = File.csvToJson(filePath);

        await assert.rejects(result, expectedError);
    }

    {
        const filePath = './__mocks__/invalid-file-length.csv';
        const expectedError = new Error(Errors.CONTENT_LENGTH)
        const result = File.csvToJson(filePath);

        await assert.rejects(result, expectedError);
    }

    {
        const filePath = './__mocks__/invalid-line-length.csv';
        const expectedError = new Error(Errors.INVALID_CONTENT)
        const result = File.csvToJson(filePath);

        await assert.rejects(result, expectedError);
    }

    {
        const filePath = './__mocks__/valid-file.csv';
        const result = await File.csvToJson(filePath);

        const expected = [
            {"id": "1", "name": "John", "profession": "Mechanic", "age": "25"},
            {"id": "2", "name": "Jane", "profession": "Doctor", "age": "29"},
            {"id": "3", "name": "Jack", "profession": "Engineer", "age": "32"},
            {"id": "4", "name": "Jill", "profession": "Teacher", "age": "28"}
        ]

        assert.deepEqual(result, expected);
    }

})()