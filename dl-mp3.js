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
    filter: 'audioonly'
};

function createSong(path, title, stream, bitrate) {
    new ffmpeg(stream)
        .audioBitrate(bitrate)
        .saveToFile(path + title + '.mp3')
        .on('error', (err) => console.log(err))
        .on('end', function () {
            console.log('finished');
        })
}

const stream = ytdl(url, options);
stream.on('info', (info, format) => {
    fs.stat(path, (err, stats) => {
        if (err) {
            fs.mkdirSync(path);
        }
        createSong(path, info.title, stream, 192);
    });
});

stream.on('error', (err) => {
    console.log(err);
});