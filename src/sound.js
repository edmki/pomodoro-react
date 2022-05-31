import bell from './assets/bell.mp3';
import beep from './assets/beep.mp3';
import success from './assets/success.mp3';

const sounds = {
    bell, beep, success,
}

const sound = {
    play: function(name, volume = 50) {
        const audio = new Audio(sounds[name]);
        audio.volume = volume / 100;
        audio.play();
    },
}

export default sound;