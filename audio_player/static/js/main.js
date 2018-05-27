var inlineStyleContent = new Array;
var inlineStyle = document.createElement('style');

function rangeInit () {
    var DEBUG = true;
    var rangeSelector = document.querySelectorAll('[type=range]');
    document.body.appendChild(inlineStyle);
    var eventname = new Event('input');
    for (var i = 0; i < rangeSelector.length; i++) {
      var item = rangeSelector[i];
      item.addEventListener('input', function () {
          var rangeInterval = Number(this.getAttribute('max') - this.getAttribute('min'));
          var rangePercent = (Number(this.value) + Math.abs(this.getAttribute('min'))) / rangeInterval * 100;
          // DEBUG ? console.log("#" + this.id + ": " + rangePercent + "%") : ''; // for debug
          writeStyle({
              id: this.id,
              percent: rangePercent
          });
      }, false);
      item.dispatchEvent(eventname); // update bars at startup
    }

    // for (var item of rangeSelector) {
    //     item.addEventListener('input', function () {
    //         var rangeInterval = Number(this.getAttribute('max') - this.getAttribute('min'));
    //         var rangePercent = (Number(this.value) + Math.abs(this.getAttribute('min'))) / rangeInterval * 100;
    //         // DEBUG ? console.log("#" + this.id + ": " + rangePercent + "%") : ''; // for debug
    //         writeStyle({
    //             id: this.id,
    //             percent: rangePercent
    //         });
    //     }, false);
    //     item.dispatchEvent(eventname); // update bars at startup
    // }
}

/**
 * Write Style element
 * 
 * @param {object} obj id: HTML id, percent: value
 */
function writeStyle (obj) {
    // var find = inlineStyleContent.map(x => x.id).indexOf(obj.id);
    var find = inlineStyleContent.map(function () {
      alert('hi');
    });
    var styleText = '';

    if (find === -1) {
        inlineStyleContent.push(obj);
    } else {
        inlineStyleContent[find] = obj;
    }

    // for (var item of inlineStyleContent) {
    //     styleText += '#' + item.id + '::-webkit-slider-runnable-track{background-size:' + item.percent + '% 100%} ';
    // }

    for (var i = 0; i < inlineStyleContent.length; i++) {
      var item = inlineStyleContent[i];
      styleText += '#' + item.id + '::-webkit-slider-runnable-track{background-size:' + item.percent + '% 100%} ';
    }

    inlineStyle.textContent = styleText;
}

$(document).ready(function () {
  handleAudio();
});

var audio = null;
var seekbar = null;
function handleAudio () {
  audio = document.getElementById('my-audio');
  seekbar = document.getElementById('seekbar');

  audio.onloadeddata = function () {
    seekbar.max = audio.duration;
  }

  audio.ontimeupdate = function () {
    var current_time = this.currentTime;
    if (current_time == audio.duration) { // 만약에 사운드가 끝나면 다시 처음으로
        this.currentTime = 0;
    }

    seekbar.value = current_time;
    var rangeInterval = Number(seekbar.getAttribute('max') - seekbar.getAttribute('min'));
    var rangePercent = (Number(seekbar.value) + Math.abs(seekbar.getAttribute('min'))) / rangeInterval * 100;
    writeStyle({
        id: 'seekbar',
        percent: rangePercent
    });
  }
}

function togglePlay (status) {
  var audioStatus = {
    PLAY: 1,
    STOP: -1,
    PAUSE: 0
  };

  if (status === audioStatus.PLAY) {
    audio.play();
    return;
  }

  if (status === audioStatus.STOP) {
    audio.pause();
    audio.currentTime = 0;
    return;
  }

  if (status === audioStatus.PAUSE) {
    audio.pause();
    return;
  }
}