let fs=require('fs');
let path=require("path");

// "├──", "└──"
function treeFn(srcPath){
    if(srcPath == undefined){
        // treeHelper(process.cwd());
        console.log("kindly enter the path");
        return;
    }
    else{
        if(fs.existsSync(srcPath)){
            treeHelper(srcPath);
        }
        else{
            console.log("kindly enter the correct path");
            return;
        }
    }
}

function treeHelper(srcPath){
    if(fs.lstatSync(srcPath).isFile()){
        let fileName = path.basename(srcPath);
        console.log("├──", fileName);
    }else{
        let dirName = path.basename(srcPath);
        console.log("└──" + dirName);
        let entities = fs.readdirSync(srcPath);
        for (let i = 0; i < entities.length; i++) {
            let entityPath = path.join(srcPath, entities[i]);
            treeHelper(entityPath,"\t");
        }
    }
}

module.exports={
    treeFn:treeFn
}