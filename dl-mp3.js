'use strict';
const ytdl = require('ytdl-core'), 
fs = require('fs'),
ffmpeg = require('fluent-ffmpeg');

const key = process.argv[2];
const url = 'https://www.youtube.com/watch?v=' + key;
const path = './musics/'

const options = {
    quality: 'highest', // 'highest', 'lowest'
    downloadURL: true,
    filter: 'audioonly' // anucha
};

function createMp3(path, filename, stream, bitrate) {
    new ffmpeg(stream)
        .audioBitrate(bitrate)
        .saveToFile(path + filename + '.mp3')
        .on('error', (err) => console.log(err))
        .on('end', function () {
            console.log(' > finished');
        }).on('progress', (progress) => {
            // process.stdout.cursorTo(0);
            // process.stdout.clearLine(1);
            // process.stdout.write('Converting... ' + progress.timemark + ' ');
        })
}

const stream = ytdl(url, options);
stream.on('info', (info, format) => {
    fs.stat(path, (err, stats) => {
        if (err) {
            fs.mkdirSync(path);
        }
        const filename = info.title.replace(/[|&;$%@"<>()+?,]/g, '');
        createMp3(path, filename, stream, 192);
    });
});

stream.on('progress', (chunk, downloaded, downloadLength) => {
    process.stdout.cursorTo(0);
    process.stdout.clearLine(1);
    process.stdout.write(downloaded + ' of ' + downloadLength);
});

stream.on('error', (err) => {
    console.log(err);
});