import * as fs from 'fs';
import * as path from 'path';

const dataDirectory = path.join(__dirname, '/data/');

export const writeToJsonFile = (data: string, fileName: string) => {
    const filePath = dataDirectory + fileName + '.json';
    const jsonContent = JSON.stringify(data);

    if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory, { recursive: true });
    }

    fs.writeFile(filePath, jsonContent, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing file ${filePath}:`, err);
        } else {
            console.log(`File written successfully: ${filePath}`);
        }
    });
    }