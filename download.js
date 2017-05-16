'use strict';
const ytdl = require('ytdl-core'), fs = require('fs');

const key = process.argv[2];
const url = 'https://www.youtube.com/watch?v=' + key;
const output = './musics/'

const options = {
    quality: 'highest', // 'highest', 'lowest'
    downloadURL: true,
    filter: 'audioonly'
};

ytdl.getInfo(url, options, function (err, info) {
    //fs.writeFile("log.json", JSON.stringify(info));
    const filename = info.title.replace(/[|&;$%@"<>()+,]/g, '');
    ytdl(url, options) // { filter: function (format) { return format.container === 'mp4'; } })
        .pipe(fs.createWriteStream(output + filename + '.mp4'));

    console.log(info.title);
});