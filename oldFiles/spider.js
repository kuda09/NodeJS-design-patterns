const utils = require('./utilities');
const request = utils.promisify(require('request'));
const fs = require('fs');
const mkdirp = utils.promisify(require('mkdirp'));
const readFile = utils.promisify(fs.readFile);
const writeFile = utils.promisify(fs.writeFile);
const path = require('path');
const _ = require('lodash');
const async = require('async');

function download(url, filename, callback) {

    console.log(`Downloading ==> "${url}"`);
    let body;

    return request (url)
        .then(response => {

            body = response.body;

            return mkdirp(path.dirname(filename));
        })
        .then(() => writeFile(filename, body))
        .then(() => {

            console.log(`Downloaded and saved  => "${url}"`)

            return body;
        })
}
function spiderLinks(currentUrl, body, nesting) {

    if(nesting === 0) {
        return Promise.resolve();
    }

    const links = utils.getPageLinks(currentUrl, body);
    const promises = _.map(links, link => spider(link, nesting - 1));

    return Promise.all(promises);
}
function spider(url, nesting, callback) {

    const filename = utils.urlToFilename(url);

    fs.readFile(filename, 'utf8', (err, body) => {

        if(err) {

            if(err.code !== 'ENOENT') {

                return callback(err);
            }

            return download(url, filename, (err, body) => {


                if(err) return callback(err);


                spiderLinks(url, body, nesting,callback);

            })

        }
        spiderLinks(url, body, nesting,callback);

    });

}

spider(process.argv[2], 1)
    .then(() => console.log(`Download complete`))
    .catch(err => console.error(err));


