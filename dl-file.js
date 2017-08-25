'use strict';

const fs = require('fs'), 
    request = require('request'), 
    progress = require('request-progress');

progress(request('https://de1.androidfilehost.com/dl/oCdtK1mELfFfd_ja_kqhpA/1495307656/745425885120730638/BeansGapps-Full-7.1.x-20170509.zip'))
    .on('progress', state => {

        //console.log(state)

        process.stdout.cursorTo(0);
        process.stdout.clearLine(1);
        process.stdout.write(state.percentage * 100);

        /*
        {
            percentage: 0.5,        // Overall percentage (between 0 to 1)
            speed: 554732,          // The download speed in bytes/sec
            size: {
              total: 90044871,      // The total payload size in bytes
              transferred: 27610959 // The transferred payload size in bytes
            },
            time: {
              elapsed: 36.235,      // The total elapsed seconds since the start (3 decimals)
              remaining: 81.403     // The remaining seconds to finish (3 decimals)
            }
        }
        */

    })
    .on('error', err => console.log(err))
    .on('end', () => { })
    .pipe(fs.createWriteStream('bar.zip'))