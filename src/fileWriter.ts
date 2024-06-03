import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '/data/data.json');

export const writeToJsonFile = (data: string) => {
    const jsonContent = JSON.stringify(data);

    fs.writeFile(filePath, jsonContent, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing file ${filePath}:`, err);
        } else {
            console.log(`File written successfully: ${filePath}`);
        }
    });
    }