const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')
const stream = require('stream')
// const multer = require('multer')

ffmpeg.setFfmpegPath(ffmpegPath)
// const storage = multer.memoryStorage()
// const mult = multer({ storage })

// class WritableChunkCache extends stream.Writable {

//   constructor(options) {
//     super(options)
//     this._chunks = []
//   }

//   write(chunk, encoding, callback) {
//     this._chunks.push(chunk)
//     if (typeof callback === 'function') callback()
//   }

//   writev(chunks, callback) {
//     this._chunks = this._chunks.concat(chunks)
//     if (typeof callback === 'function') callback()
//   }

//   get buffer() {
//     return Buffer.concat(this._chunks)
//   }
// }

exports.transcode = function (req, res) {
  // make sure you set the correct path to your video file
  var proc = ffmpeg()
    // .input(`${__dirname}/frames/frameset-6D4BAD/frame-9948.png`)
    // .addInput(`/frames/frameset-6D4BAD/frame-*.png`)
    // .addInput(path.resolve("./tmp/*.jpg")
    .addInput(path.resolve('./frames/frameset-6D4BAD/frame-*.png'))
    .inputOptions("-pattern_type glob")
    .videoCodec('libx264')
    .format('mp4')
    .size('1280x720')
    // using 25 fps
    .fps(25)
    // setup event handlers
    .on("progress", (data) => {
      // log number of frames complete
      console.log("Frames completed:", data.frames);
    })
    .on('end', () => {
      const message = 'file has been converted succesfully';
      console.log(message);
      res.send({ message });
    })
    .on('error', (err, ...args) => {
      console.error(err, args)
      res.send(err)
    })
    .save(`${__dirname}/tmp/test-${Date.now()}.mp4`);


  // // handle multipart form data
  // var videoUpload = mult.single('video')
  // videoUpload(req, res, () => {

  //   var file = req.file
  //   var readStream = new stream.PassThrough()
  //   readStream.end(new Buffer(file.buffer))
  //   var outStream = new WritableChunkCache()

  //   var command = new FfmpegCommand(readStream)
  //     .fps(30)
  //     .on('end', () => {
  //       res.send({ buffer: outStream.buffer })
  //     })
  //     .on('error', (err, ...args) => {
  //       console.error(err, args)
  //       res.send(err)
  //     })
  //     .format('mp4')
  //     .videoCodec('libx264')
  //     .outputOptions([
  //       '-movflags frag_keyframe+empty_moov' // accounting for unknown duration due to streamed input
  //     ])
  //     .pipe(outStream, { end: true })
  // })
}

// exports.transcode1 = (req, res) => {
//   const ffmpeg = require('fluent-ffmpeg');

//   let cmd = ffmpeg('mountain-sky-1.mp4')
//     .clone()
//     .size('320x180')
//     .save('/tmp/smaller-file.mp4')
//     .on('end', () => {
//       // Finished processing the video.
//       console.log('Done');

//       // E.g. return the resized video:
//       res.sendFile('/tmp/smaller-file.mp4');
//     });
// };

// exports.transcode = (req, res) => {
//   var proc = ffmpeg(`${__dirname}/frames/frameset-6D4BAD/frame-%01d.png`)
//   .fps(1)
//   .on('end', function() {
//        console.log('file has been converted succesfully');
//   })
//     .on('error', function(err) {
//       console.log('an error happened: ' + err.message);
//   })
//   .save(path.resolve(`${__dirname}/tmp/video-${Date.now()}.mp4`));
// };
