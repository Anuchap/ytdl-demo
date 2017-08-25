'use strict';
const ytdl = require('ytdl-core'), 
fs = require('fs');

const key = process.argv[2];
const url = 'https://www.youtube.com/watch?v=' + key;
const path = './musics/';

const options = {
    //quality: 'lowest', // 'highest', 'lowest'
    //downloadURL: true,
    filter: function (format) { return format.container === 'mp4'; }
};

ytdl.getInfo(url, options, function (err, info) {
    let filename = info.title.replace(/[|&;$%@"<>()+,]/g, '');
    const stream = ytdl(url, options);
    //filename = 'Replace Screen Nexus 5X';
    stream.pipe(fs.createWriteStream(path + filename + '.mp4'));

    stream.on('progress', (chunk, downloaded, downloadLength) => {
        process.stdout.cursorTo(0);
        process.stdout.clearLine(1);
        process.stdout.write(downloaded + ' of ' + downloadLength);

        if(downloaded === downloadLength) {
            console.log(' finished');
        }
    });
});
