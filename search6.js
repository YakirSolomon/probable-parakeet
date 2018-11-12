var path = require('path'), fs=require('fs');

function fromDir(startPath,filter,str){

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter,str);
        }
        else if (filename.indexOf(filter)>=0) {
            //console.log('-- found: ',filename);
                var content = fs.readFileSync(filename, 'utf8');
                if(content.indexOf(str) >= 0){
                 console.log(filename);
                }
              };
        };
};

var str = process.argv[3];
var extension = '.' + process.argv[2];
fromDir('../',extension,str);


