import bell from './assets/bell.mp3';
import beep from './assets/beep.mp3';
import success from './assets/success.mp3';

const sounds = {
    bell, beep, success,
}

const sound = {
    audio: null,
    load: (name) => {
        sound.audio = new Audio(sounds[name]);
    },
    play: function(volume = 50) {
        sound.audio.volume = volume / 100;
        sound.audio.play();
    },
}

export default sound;