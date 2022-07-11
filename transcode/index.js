const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

ffmpeg.setFfmpegPath(ffmpegPath)

exports.transcode = function (req, res) {
  // make sure you set the correct path to your video file
  const framesFolder = 'frameset-71E677';
  const framesPerSec = 25;
  const resolution = '1280x720';
  const codec = 'libx264';
  // const codec = 'h264_videotoolbox';
  const outputFormat = 'mp4';

  // ffmpeg.getAvailableCodecs(function(err, codecs) {
  //   console.log('Available codecs:');
  //   console.dir(codecs);
  // });
  // return;

  const proc = ffmpeg()
    .addInput(path.resolve(`./frames/${framesFolder}/frame-%d.png`))
    .inputOptions('-pattern_type sequence')
    .outputOptions([
      `-r ${framesPerSec}`,
      '-pix_fmt yuv420p',
      // scale and crop to HD
      // `-vf scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080`
    ])
    .videoCodec(codec)
    .format(outputFormat)
    .size(resolution)
    // .fps(framesPerSec)
    .noAudio()
    // .on("progress", (data) => {
    //   // log number of frames complete
    //   console.log("Frames completed:", data.frames);
    // })
    .on('end', () => {
      const message = 'file has been converted succesfully';
      console.log(message);
      res.send({ message });
    })
    .on('error', (err, ...args) => {
      console.error(err, args)
      res.send(err)
    })
    .save(path.resolve(`./tmp/test-${Date.now()}.mp4`));


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
