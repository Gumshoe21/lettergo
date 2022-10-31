// This utility script converts our large list of English words into an array of strings for further manipulation later.

const { readFileSync, writeFile } = require('fs');

const contents = readFileSync('../lib/englishWords.txt', 'utf-8');

const arr = contents.split(/\r?\n/);

writeFile('./englishWords.ts', JSON.stringify(arr), err => {
	console.log(err);
});
