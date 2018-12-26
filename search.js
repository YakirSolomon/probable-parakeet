var path = require('path'), fs=require('fs'); // declaring variables 
var flag = false; //flag to determine if at least one file was found 

// recursive function to look for every file in the super dir and current dir
function searchDir(startPath,filter,str){ 

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }
    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            searchDir(filename,filter,str);
        }
        else if (filename.indexOf(filter)>=0) {
                var content = fs.readFileSync(filename, 'utf8');
                if(content.indexOf(str) >= 0){
                    var newFilename = filename.replace("../", "C:/");
                    console.log(newFilename);
                    flag = true;
                }
            };
    };
};

if (process.argv.length==2){
    console.log("USAGE: node search [EXT] [TEXT]");
    return;
};

var str = process.argv[3];
var extension = '.' + process.argv[2];
searchDir('../',extension,str);

if(!flag){
    console.log("No file was found");
};
