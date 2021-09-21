let fs = require('fs');
let path = require('path');
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    pictures: ['png', 'jpg', 'jpeg']
}

function organiseFn(srcPath) {
    // console.log(srcPath)
    
    let entities = fs.readdirSync(srcPath);
    let organiseFolder = path.join(srcPath, "organisedFiles");

    if (!fs.existsSync(organiseFolder)) {
        fs.mkdirSync(organiseFolder);
    }

    for (let i = 0; i < entities.length; i++) {

        let file = entities[i];
        let filePath = path.join(srcPath, file)
        if (fs.lstatSync(filePath).isFile()) {

            let type = checkType(file);
            let typeFolder = path.join(organiseFolder, type);
            if (!fs.existsSync(typeFolder)) {
                fs.mkdirSync(typeFolder)
            }

            let src = path.join(srcPath, entities[i]);
            let dest = path.join(typeFolder, entities[i]);
            fs.copyFileSync(src, dest);
        }

    }
}

function checkType(file) {

    let extname = path.extname(file);
    extname = extname.slice(1);

    for (let type in types) {
        // you will get all the types ie. media, archives, documents,apps one by one in type

        let currentTypeArray = types[type];
        // console.log(currentTypeArray);
        // if type is media, then in currentTypeArray, the array recieved will be [mp4,mkv,mp3]

        for (let i = 0; i < currentTypeArray.length; i++) {
            
            if (extname == currentTypeArray[i]) {
                return type;
            }
        }
    }
    return 'others';
}


module.exports = {
    organiseFn: organiseFn
}











