const { createReadStream, readdirSync } = require('fs');
const path = require('path');

let models = [];

if (process.env.HUB_ENVIRONMENT === 'development') {
  readdirSync(path.join(__dirname, './images')).forEach(filename => {
    let readStream = createReadStream(path.join(__dirname, 'images', filename));

    readStream.type = 'cardstack-files';
    readStream.id = filename.replace(/\..+/, '');
    let pathSegments = filename.split('/');
    readStream['filename'] = pathSegments[pathSegments.length - 1];

    models.push(readStream);
  });
}

module.exports = models;