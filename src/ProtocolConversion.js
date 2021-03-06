const child_process = require('child_process')
const EventEmitter = require('events')

class ProtocolConversion extends EventEmitter {
    constructor(options) {
        super(options)

        this.url = options.url

        const ffmpegArgus = [
            '-i', this.url,
            '-f', 'h264',
            '-codec', 'copy',
            '-'
        ]
        this.stream = child_process.spawn("ffmpeg", ffmpegArgus, {
            detached: false
        })

        this.inputStreamStarted = true
        this.stream.stdout.on('data', (data) => {
            return this.emit('streamData', data)
        })
        this.stream.stderr.on('data', (data) => {
            return this.emit('ffmpegError', data)
        })
    }
}

module.exports = ProtocolConversion
