const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const FfmpegCommand = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')
const stream = require('stream')
const multer = require('multer')

FfmpegCommand.setFfmpegPath(ffmpegPath)
const storage = multer.memoryStorage()
const mult = multer({ storage })

class WritableChunkCache extends stream.Writable {

  constructor(options) {
    super(options)
    this._chunks = []
  }

  write(chunk, encoding, callback) {
    this._chunks.push(chunk)
    if (typeof callback === 'function') callback()
  }

  writev(chunks, callback) {
    this._chunks = this._chunks.concat(chunks)
    if (typeof callback === 'function') callback()
  }

  get buffer() {
    return Buffer.concat(this._chunks)
  }
}

exports.transcode = function (req, res) {
  // handle multipart form data
  var videoUpload = mult.single('video')
  videoUpload(req, res, () => {

    var file = req.file
    var readStream = new stream.PassThrough()
    readStream.end(new Buffer(file.buffer))
    var outStream = new WritableChunkCache()

    var command = new FfmpegCommand(readStream)
      .fps(30)
      .on('end', () => {
        res.send({ buffer: outStream.buffer })
      })
      .on('error', (err, ...args) => {
        console.error(err, args)
        res.send(err)
      })
      .format('mp4')
      .videoCodec('libx264')
      .outputOptions([
        '-movflags frag_keyframe+empty_moov' // accounting for unknown duration due to streamed input
      ])
      .pipe(outStream, { end: true })
  })
}