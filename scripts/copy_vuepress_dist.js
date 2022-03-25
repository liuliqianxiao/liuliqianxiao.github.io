const fs = require("fs");
const path = require("path");

let destRootDir = path.resolve("..");
let srcRootDir = path.resolve("../../Blog/docs/.vuepress/dist/");

let files = [];


function loopFindFiles(dir) {
    if (fs.statSync(dir).isDirectory()) {
        files.push({dir, isDirectory: true});
        let subFiles = fs.readdirSync(dir);
        subFiles.forEach(fileName => {
            loopFindFiles(path.join(dir, fileName));
        })
    } else {
        files.push({dir, isDirectory: false});
    }
}

loopFindFiles(srcRootDir);
files.forEach(({dir, isDirectory}) => {
    let fileShortName = dir.replace(srcRootDir, "");
    if (!fileShortName) return;
    let destFullPath = path.join(destRootDir, fileShortName);
    if (!fs.existsSync(path.dirname(destFullPath))) {
        fs.mkdirSync(path.dirname(destFullPath), {recursive: true});
    }
    if (!isDirectory) {
        fs.copyFileSync(dir, destFullPath);
    }
})
console.log(`>>>>>>>>>>复制成功<<<<<<<<<<<<<<<`);