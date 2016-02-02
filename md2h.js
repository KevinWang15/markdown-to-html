#!/usr/bin/env node

var fs = require('fs');
var process = require('process');
var showdown = require('showdown');

var fileName = process.argv.splice(2)[0];
var content, style;

if (!fileName || fileName == "--help") {
    printHelp();
    return;
}

try {
    style = fs.readFileSync(__dirname + '/style.css', {encoding: "utf8"});
} catch (Exception) {
    console.log('style.css not found');
    return;
}
try {
    content = fs.readFileSync(fileName, {encoding: "utf8"});
} catch (Exception) {
    console.log('File "' + fileName + '" not found');
    return;
}

var converter = new showdown.Converter();
content = '<!DOCTYPE html><html><head><meta charset="utf-8">' +
    '<title>' + fileName + '</title>' +
    '<style>' + style + '</style>' +
    '</head><body>'
    + converter.makeHtml(content) + '</body></html>';

fs.writeFileSync(fileName + ".html", content);
console.log(fileName + '.html generated');

function printHelp() {
    console.log("Usage: md2h [filename]\n       will generate [filename].html\n\n       e.g. md2h README.md\n            generates README.md.html");
}