const URL = 'https://www.youtube.com/watch?v=u0tn0vzmXZo&list=PLkhecmRoKWr9COJKa6Y0Xz0hEZPTWJO9d';
const PATH = './musics2/'
const options = {
    quality: 'highest', // 'highest', 'lowest'
    downloadURL: true,
    filter: 'audioonly'
}

const request = require('request')
const cheerio = require('cheerio')
const ytdl = require('ytdl-core') 
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')

request(URL, (err, response, body) => {
    if(err)
        console.log(err)
    if (!err && response.statusCode === 200) {
        let $ = cheerio.load(body);

        $('.playlist-video').each(function() { 
            const key = $(this).attr('href').split('&')[0].split('=')[1]; 
            const link = 'https://www.youtube.com/watch?v=' + key;

            console.log(link);

            const stream = ytdl(link, options);
            stream.on('info', (info, format) => {
                fs.stat(PATH, (err, stats) => {
                    if (err) {
                        fs.mkdirSync(PATH);
                    }
                    const filename = info.title.replace(/[|&;$%@"<>()+?,]/g, '');
                    createMp3(filename, stream, 192);
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
        })
    }
})

function createMp3(filename, stream, bitrate) {
    new ffmpeg(stream)
        .audioBitrate(bitrate)
        .saveToFile(PATH + filename + '.mp3')
        .on('error', (err) => console.log(err))
        .on('end', function () {
            console.log(' > finished');
        }).on('progress', (progress) => {
            // process.stdout.cursorTo(0);
            // process.stdout.clearLine(1);
            // process.stdout.write('Converting... ' + progress.timemark + ' ');
        })
}