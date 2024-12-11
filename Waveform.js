// Waveform.js

// Object to render an audio waveform audio from a video
// Preloads and saves AudioBuffer (https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer)
// Updates canvas to draw a progress bar given a timestamp in audio, 
// drawProgressBar() can be triggered by video timeupdate event
// Ex. wf.drawProgressBar(e.target.currentTime)
class Waveform {
    #cvs;               // Canvas element
    #ctx;               // 2D canvas context
    #start;             // Audio window start seconds
    #end;               // Audio window end seconds
    #audioBuffer;       // Computed audio buffer from video
    #length;            // Length of audio in 10,000ths of a second
    #duration;          // Duration of audio in second
    #resizeObserver;    // Monitors canvas and redraws when resized

    // Waveform Constructor
    // @param {String}   pid    id of parent element
    // @param {String}   url    URL of video to render
    // @param {Function} cb     callback function to be invoked after complete
    // @param {String}   width  canvas element width CSS
    // @param {String}   height canvas element height CSS
    constructor(pid, url, cb=null, width='100%', height='100%') {

        // Load video, convert to an arrayBuffer, and extract audio
        fetch(url).then(resp => resp.arrayBuffer()).then(buffer => {
            const audioCtx = new AudioContext();//{sampleRate:sampleRate});
            audioCtx.decodeAudioData(buffer, abuffer => {
                this.#audioBuffer = abuffer;    // audioBuffer created from loaded video
                this.#length   = abuffer.length;
                this.#duration = abuffer.duration;
                this.#start = 0;
                this.#end = abuffer.duration;
                this.draw();                    // Draw as soon as loaded
                if (cb) cb();
            });
        });

        // Create and add a <canvas> element to parent element and save 2d context
        const parent = document.getElementById(pid);
        this.#cvs = document.createElement('canvas');
        this.#cvs.style.width  = width;
        this.#cvs.style.height = height;
        parent.appendChild(this.#cvs);
        this.#ctx = this.#cvs.getContext("2d");

        // Reset the canvas dimensions when element is resized
        this.#resizeObserver = new ResizeObserver((cvs) => {
            this.#cvs.width  = this.#cvs.offsetWidth;
            this.#cvs.height = this.#cvs.offsetHeight;
            this.draw();
        });
        this.#resizeObserver.observe(this.#cvs);
    };

    // Set the time range to display
    // @param {Number} start   start time to render (seconds)
    // @param {Number} end     end time to render (seconds)
    setRange(start, end) {
        this.#start = start;
        this.#end   = end;
    }

    // Draw waveform
    draw() {
        if (!this.#audioBuffer) return;

        // Copy some values into locals
        const cw     = this.#cvs.offsetWidth;
        const ch     = this.#cvs.offsetHeight;
        const ch2    = ch/2;
        const start  = this.#start;
        const end    = this.#end;
        
        this.#ctx.beginPath();
        this.#ctx.strokeStyle = '#003d70';  // waveform color
        this.#ctx.clearRect(0, 0, cw, ch);
    
        const left   = this.#audioBuffer.getChannelData(0);
        const right  = this.#audioBuffer.getChannelData(1);
        const npts   = cw * 10;   // points to plot per pixel width - arbitrary
        let startIdx = Math.round(this.#length * (start / this.#duration));
        let endIdx   = Math.round(this.#length * (end / this.#duration));
        let delIdx   = Math.round((endIdx - startIdx) / npts );
        let delX     = cw / npts;
        let x        = 0;
        this.#ctx.moveTo(x, ch2);
        for (var i = startIdx; i <= endIdx; i += delIdx) {
            let y = (Math.max(left[i],right[i]) + 0.5) * ch;
            this.#ctx.lineTo(x, y);
            x += delX;
        }
        this.#ctx.stroke();
    }

    // Draw progress bar over waveform
    // @param {Number} secs  Progress in seconds from start
    drawProgressBar(secs) {
        const x  =  this.#cvs.offsetWidth * (secs - this.#start)/(this.#end - this.#start);
        this.#ctx.globalCompositeOperation = "destination-over";
        this.#ctx.beginPath();
        this.#ctx.fillStyle='#83cbff';
        this.#ctx.rect(0, 0, x, this.#cvs.offsetHeight);
        this.#ctx.fill();
    }
};
