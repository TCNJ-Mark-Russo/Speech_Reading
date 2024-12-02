// Globals
const _HL = {           // Hearing loss level constants
    NORMAL:     0,
    MILD:       1,
    MODERATE:   2,
    SEVERE:     3,
    PROFOUND:   4
};
let _hloss  = _HL.MILD; // Current level of hearing loss

// Sentences mapped to video segments
const _sentences = [
    {path:"videos/MVI_4569.MOV", start:   0.0, end:   3.0, phrase: "A rod is used to catch pink salmon"},
    {path:"videos/MVI_4569.MOV", start:   4.0, end:   7.0, phrase: "The boy was there when the sun rose"},
    {path:"videos/MVI_4569.MOV", start:   8.0, end:  12.0, phrase: "March the soldiers past the next hill"},
    {path:"videos/MVI_4569.MOV", start:  13.0, end:  16.0, phrase: "Wipe the grease off his dirty face."},
    {path:"videos/MVI_4569.MOV", start:  18.0, end:  21.0, phrase: "Time brings us many changes."},
    {path:"videos/MVI_4569.MOV", start:  23.0, end:  26.0, phrase: "The frosty air passed through the coat."},
    {path:"videos/MVI_4569.MOV", start:  28.0, end:  31.0, phrase: "Next Sunday is the twelfth of the month."},
    {path:"videos/MVI_4569.MOV", start:  34.0, end:  37.0, phrase: "Glue the sheet to the dark background."},
    {path:"videos/MVI_4569.MOV", start:  40.0, end:  43.0, phrase: "The zones merge in the central part of town."},
    {path:"videos/MVI_4569.MOV", start:  46.0, end:  49.0, phrase: "Let's all join as we sing the chorus."},

    {path:"videos/MVI_4567.MOV", start:  52.0, end:  55.0, phrase: "A rod is used to catch pink salmon"},
    {path:"videos/MVI_4567.MOV", start:  57.0, end:  60.0, phrase: "The boy was there when the sun rose"},
    {path:"videos/MVI_4567.MOV", start:  62.0, end:  66.0, phrase: "March the soldiers past the next hill"},
    {path:"videos/MVI_4567.MOV", start:  67.0, end:  71.0, phrase: "Wipe the grease off his dirty face."},
    {path:"videos/MVI_4567.MOV", start:  74.0, end:  77.0, phrase: "Time brings us many changes."},
    {path:"videos/MVI_4567.MOV", start:  80.0, end:  84.0, phrase: "The frosty air passed through the coat."},
    {path:"videos/MVI_4567.MOV", start:  86.0, end:  90.0, phrase: "Next Sunday is the twelfth of the month."},
    {path:"videos/MVI_4567.MOV", start:  92.0, end:  96.0, phrase: "Glue the sheet to the dark background."},
    {path:"videos/MVI_4567.MOV", start:  98.0, end: 102.0, phrase: "The zones merge in the central part of town."},
    {path:"videos/MVI_4567.MOV", start: 103.0, end: 107.0, phrase: "Let's all join as we sing the chorus."},

    {path:"videos/MVI_4570.MOV", start: 111.0, end: 115.0, phrase: "A rod is used to catch pink salmon"},
    {path:"videos/MVI_4570.MOV", start: 117.0, end: 120.0, phrase: "The boy was there when the sun rose"},
    {path:"videos/MVI_4570.MOV", start: 122.0, end: 126.0, phrase: "March the soldiers past the next hill"},
    {path:"videos/MVI_4570.MOV", start: 127.0, end: 131.0, phrase: "Wipe the grease off his dirty face."},
    {path:"videos/MVI_4570.MOV", start: 132.0, end: 136.0, phrase: "Time brings us many changes."},
    {path:"videos/MVI_4570.MOV", start: 137.0, end: 141.0, phrase: "The frosty air passed through the coat."},
    {path:"videos/MVI_4570.MOV", start: 145.0, end: 148.0, phrase: "Next Sunday is the twelfth of the month."},
    {path:"videos/MVI_4570.MOV", start: 151.0, end: 154.0, phrase: "Glue the sheet to the dark background."},
    {path:"videos/MVI_4570.MOV", start: 158.0, end: 162.0, phrase: "The zones merge in the central part of town."},
    {path:"videos/MVI_4570.MOV", start: 166.0, end: 170.0, phrase: "Let's all join as we sing the chorus."},

    {path:"videos/MVI_4572.MOV", start: 173.0, end: 177.0, phrase: "A rod is used to catch pink salmon"},
    {path:"videos/MVI_4572.MOV", start: 179.0, end: 182.0, phrase: "The boy was there when the sun rose"},
    {path:"videos/MVI_4572.MOV", start: 183.0, end: 187.0, phrase: "March the soldiers past the next hill"},
    {path:"videos/MVI_4572.MOV", start: 188.0, end: 192.0, phrase: "Wipe the grease off his dirty face."},
    {path:"videos/MVI_4572.MOV", start: 193.0, end: 196.0, phrase: "Time brings us many changes."},
    {path:"videos/MVI_4572.MOV", start: 197.0, end: 201.0, phrase: "The frosty air passed through the coat."},
    {path:"videos/MVI_4572.MOV", start: 201.0, end: 205.0, phrase: "Next Sunday is the twelfth of the month."},
    {path:"videos/MVI_4572.MOV", start: 207.0, end: 210.0, phrase: "Glue the sheet to the dark background."},
    {path:"videos/MVI_4572.MOV", start: 220.0, end: 224.0, phrase: "The zones merge in the central part of town."},
    {path:"videos/MVI_4572.MOV", start: 226.0, end: 229.0, phrase: "Let's all join as we sing the chorus."}

];

// Info about current video segment under test
//let _path     = "videos/MVI_4569.MOV";  // Video path
let _start    = 0.0;                    // Video segment start time
let _end      = 3.0;                    // Video segment end time
let _sentence = "A rod is used to catch pink salmon";      // Current phrase

const agPresetMap = new Map();
agPresetMap.set(_HL.NORMAL,   {'b125':20,  'b250':15,  'b500':10, 'b1000':15,  'b2000':20,  'b4000':15,  'b8000':20});
agPresetMap.set(_HL.MILD,     {'b125':40,  'b250':35,  'b500':35, 'b1000':40,  'b2000':35,  'b4000':40,  'b8000':30});
agPresetMap.set(_HL.MODERATE, {'b125':50,  'b250':40,  'b500':40, 'b1000':50,  'b2000':50,  'b4000':45,  'b8000':50});
agPresetMap.set(_HL.SEVERE,   {'b125':70,  'b250':70,  'b500':75, 'b1000':70,  'b2000':80,  'b4000':90,  'b8000':90});
agPresetMap.set(_HL.PROFOUND, {'b125':100, 'b250':110, 'b500':95, 'b1000':100, 'b2000':110, 'b4000':105, 'b8000':100});

let filters = null;
let audioContext = null;

document.addEventListener('DOMContentLoaded', function() {
    // Hearing Loss option selectors
    const hlevels = document.querySelectorAll('nav>ul>li>a');
    hlevels.forEach( level => {
        level.addEventListener('click', (e) => {
            const levels = document.querySelectorAll('nav>ul>li>a');
            levels.forEach( lvl => { lvl.classList.remove('active'); })
            level.classList.add('active');
            setLevel( level.textContent );
        });
    });

    // Caption - Audiogram Tabs
    const tabs     = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content-item');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabId = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Button to randomly select a new phrase
    document.getElementById('id_new_sentence').addEventListener( 'click', (e) => {
        selectSentence(true);
    });

    // Button to replay phrase
    document.getElementById('id_replay_sentence').addEventListener( 'click', (e) => {
        replaySentence();
    });

    // Event to update score
    document.getElementById('id_inputArea').addEventListener('input', updatePercentages);

    // Event to ensure audio context is initialized
    document.getElementById('id_video').addEventListener('play', initAudioContext); 

    // Change playback difficulty options
    // Degraded Audio Only - No Face Video
    document.getElementById("choice-1").addEventListener('click', (e) => {
        setChoice("choice-1");
        replaySentence();
    });

    // Degraded Audio with Face Video
    document.getElementById("choice-2").addEventListener('click', (e) => {
        setChoice("choice-2");
        replaySentence();
    });

    // Non-Degraded Audio with Face Video
    document.getElementById("choice-3").addEventListener('click', (e) => {
        setChoice("choice-3");
        replaySentence();
    });

    // Pause video when outside current phrase time range
    document.getElementById("id_video").addEventListener('timeupdate', (e) => {
        const _now = e.target.currentTime;
        if (_now < _start || _now > _end) {
            e.target.pause();
        }
    });

    // Default to choice-1
    setChoice("choice-1");
});

// Select degradation choice and update interface
function setChoice(choice) {
    initAudioContext();

    const buttons = document.querySelectorAll("button.choice");
    buttons.forEach( b => b.classList.remove("c-active"));
    document.getElementById(choice).classList.add("c-active");

    const video  = document.getElementById("id_video");
    switch(choice) {
        case "choice-1":
            video.style.filter = "blur(25px)";
            break;
        case "choice-2":
            video.style.filter = "none";
            break;
        case "choice-3":
            video.style.filter = "none";
            break;
    }
}

// Select new sentence at random
function selectSentence(play=false) {
    // TODO: Write separate functions for updating percentage display
    document.getElementById('id_inputArea').value = '';
    document.getElementById('id_percentageSlider').value = 0;
    document.getElementById('id_percentageDisplay').textContent = "0%";

    let idx   = Math.floor(Math.random() * _sentences.length);
    // _path     = _sentences[idx].path;
    _start    = _sentences[idx].start;
    _end      = _sentences[idx].end;
    _sentence = _sentences[idx].phrase;
    const video  = document.getElementById("id_video");
    //if (video.src != _path) video.src = _path;
    video.currentTime = _start;
    // document.wavesurfer.load(_path);
    if (play) { video.play(); }
}

// Replay current sentence
function replaySentence() {
    const video  = document.getElementById("id_video");
    video.currentTime = _start;
    video.play();
}

// Change Hearing Level Loss Display and reset video
function setLevel(lvl) {
    const _title  = document.querySelector(".intro > h1");
    const _audiog = document.querySelector("#graph > img");
    
    if (lvl.localeCompare("Profound") == 0) {
        _hloss = _HL.PROFOUND;
        pickAudigramPreset(_hloss);
        _title.innerHTML = "Profound Hearing Loss <br><span>→ 90 dB HL - 110 dB HL</span>";
        _audiog.src = "profound.png";
    } else if (lvl.localeCompare("Severe") == 0) {
        _hloss = _HL.SEVERE;
        pickAudigramPreset(_hloss);
        _title.innerHTML = "Severe Hearing Loss <br><span>→ 70 dB HL - 90 dB HL</span>";
        _audiog.src = "severe.png";
    } else if (lvl.localeCompare("Moderate") == 0) {
        _hloss = _HL.MODERATE;
        pickAudigramPreset(_hloss);
        _title.innerHTML = "Moderate Hearing Loss <br><span>→ 40 dB HL - 60 dB HL</span>";
        _audiog.src = "moderate.png";
    } else if (lvl.localeCompare("Mild") == 0) {
        _hloss = _HL.MILD;
        pickAudigramPreset(_hloss);
        _title.innerHTML = "Mild Hearing Loss <br><span>→ 30 dB HL - 40 dB HL</span>";
        _audiog.src = "mild.png";
    } else if (lvl.localeCompare("Normal") == 0) {
        _hloss = _HL.NORMAL;
        pickAudigramPreset(_hloss);
        _title.innerHTML = "Normal Hearing <br><span></span>";
        _audiog.src = "normal.png";
    }
}

// TEXT ACCURACY
function updatePercentages(e) {
    const display = document.querySelector('#id_percentageDisplay');
    const slider  = document.querySelector('#id_percentageSlider');
    let orig  = _sentence; //document.getElementById("transcript").innerText;    // Get string to match, strip all spaces
    let guess = document.getElementById("id_inputArea").value;         // Get guess, strip all spaces
    orig      = orig.replace(/[ .,\n\r\t]/g, "").toUpperCase();
    guess     = guess.replace(/[ .,\n\r\t]/g, "").toUpperCase();
    const scr = score(orig, guess);                                 // Calculate score
    display.textContent = scr.toFixed(1) + "%";
    slider.value = scr;
}

// Calculate similarity score between two strings: orig and guess
// --------------------------------- longest common subsequence below -----------------------------------
function score(orig, guess) {
    // create memoization table to store substrings of original and user's guess
    const memo = new Array(orig.length + 1).fill(null).map(() => new Array(guess.length + 1).fill(-1));

    function lcsHelper(i, j) {
        // if either string is empty, return 0
        if (i === 0 || j === 0) return 0;

        // if there is a valid substring in the memo table, return the value
        if (memo[i][j] !== -1) return memo[i][j];

        // check if character from both strings match
        if (orig[i - 1] === guess[j - 1])
            // if matched then extend LCS
            memo[i][j] = 1 + lcsHelper(i - 1, j - 1);
        else
            // if not matched then take previous LCS up to this point
            // compares by checking LCS up 1 and left 1 in the memo table
            memo[i][j] = Math.max(lcsHelper(i - 1, j), lcsHelper(i, j - 1));

        return memo[i][j];
    }

    const lcsLength = lcsHelper(orig.length, guess.length);

    // calculate percentage 
    let lcsGuessScore = (lcsLength / orig.length) * 100;

    return lcsGuessScore;
}

//set the Audiogram Preset for each hearing loss level
function pickAudigramPreset(presetName){
    if(audioContext == null){
       // console.log("Audio context not made yet");
        return;
    }
    //console.log('3');
    if(agPresetMap.has(presetName)){
        let agPreset = agPresetMap.get(presetName);
        let i = 0;
        for(let frequency in agPreset){
            //console.log(filters[i]);
            setdB(agPreset[frequency], filters[i]);
            i++;
        }
    }
}

function setdB(dB, filter){                             //modify the gain to change the sound
    dB = Math.min(Math.max(dB, -10), 120);
    //update gain value + apply factor
    if(filter){
        //console.log(filter.gain.value);
        // filter.gain.value = 3*dB;
        filter.gain.value = -0.2*dB;
        //console.log(filter.gain.value)
    }
}

function initAudioContext(){                            //init the audioContext only if it was not initalized before
    if(audioContext == null){
        audioContext = new AudioContext();
        initFilters();
    } else if (audioContext.state == 'suspended') {
        audioContext.resume();
    }
} 

function initFilters(){                                 // init filters only when called by initAudioContext()
    //filters 
    filters = [ 
        new BiquadFilterNode(audioContext, { type: 'lowshelf',  gain: 0.0, Q: 1, frequency: 125}),
        new BiquadFilterNode(audioContext, { type: 'peaking',   gain: 0.0, Q: 1, frequency: 250  }),
        new BiquadFilterNode(audioContext, { type: 'peaking',   gain: 0.0, Q: 1, frequency: 500  }),
        new BiquadFilterNode(audioContext, { type: 'peaking',   gain: 0.0, Q: 1, frequency: 1000 }),
        new BiquadFilterNode(audioContext, { type: 'peaking',   gain: 0.0, Q: 1, frequency: 2000 }),
        new BiquadFilterNode(audioContext, { type: 'peaking',   gain: 0.0, Q: 1, frequency: 4000 }),
        new BiquadFilterNode(audioContext, { type: 'highshelf', gain: 0.0, Q: 1, frequency: 8000 })
    ];

    //grab audio from the video
    let audioSource = audioContext.createMediaElementSource(document.getElementById("id_video"));

    //build pipeline... connect filter->destination
    audioSource.connect(filters[0])
               .connect(filters[1])
               .connect(filters[2])
               .connect(filters[3])
               .connect(filters[4])
               .connect(filters[5])
               .connect(filters[6])
               .connect(audioContext.destination);

    //init to mild 
    pickAudigramPreset(_hloss);    
}