'use strict';
const ytdl = require('ytdl-core'), 
fs = require('fs');

const key = process.argv[2];
const url = 'https://www.youtube.com/watch?v=' + key;
const path = './musics/'

const options = {
    quality: 'highest', // 'highest', 'lowest'
    downloadURL: true,
    filter: function (format) { return format.container === 'mp4'; }
};

ytdl.getInfo(url, options, function (err, info) {
    const filename = info.title.replace(/[|&;$%@"<>()+,]/g, '');
    ytdl(url, options)
        .pipe(fs.createWriteStream(path + filename + '.mp4'));
    console.log('finished');
});
