const fromArray = require('from2-array');
const through = require('through2');
const fs = require('fs');

function concatFiles(destination, files, callback) {

    const destStream = fs.createWriteStream(destination);

    fromArray.obj(files)
        .pipe(through.obj((file, enc, done) => {

           fs.createReadStream(file)
                .pipe(destStream, { end: false})
                .on('end', done);
        }))
        .on('finish', () => {

            destStream.end();
            callback();
        });
}


module.exports = concatFiles;


