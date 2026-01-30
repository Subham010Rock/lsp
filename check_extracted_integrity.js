
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const extractedDir = path.join(__dirname, 'src/extracted/component');
const indexFile = path.join(extractedDir, 'index.json');

const index = JSON.parse(fs.readFileSync(indexFile, 'utf-8'));
const files = fs.readdirSync(extractedDir).filter(f => f !== 'index.json');

console.log(`Total entries in index.json: ${Object.keys(index).length}`);
console.log(`Total files in component dir: ${files.length}`);

const missingFiles = [];
const missingNames = [];
const mismatches = [];

for (const [id, data] of Object.entries(index)) {
    const filename = `${id}.json`;
    const filePath = path.join(extractedDir, filename);

    if (!fs.existsSync(filePath)) {
        missingFiles.push(id);
        continue;
    }

    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (!content.name) {
            missingNames.push({ id, filename });
        } else if (content.name !== data.name) {
            mismatches.push({ id, filename, indexName: data.name, fileName: content.name });
        }
    } catch (e) {
        console.error(`Error reading ${filename}: ${e.message}`);
    }
}

console.log('--- Results ---');
console.log(`Missing files: ${missingFiles.length}`);
if (missingFiles.length > 0) console.log(missingFiles);

console.log(`Files missing 'name' property: ${missingNames.length}`);
if (missingNames.length > 0) console.log(missingNames);

console.log(`Name mismatches: ${mismatches.length}`);
if (mismatches.length > 0) console.log(mismatches);
