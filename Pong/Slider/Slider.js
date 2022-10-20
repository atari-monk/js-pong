import { Game } from '../../Framework/Game.js';
import { Slider } from '../../Framework/Slider.js';
import { Vector2 } from '../../Framework/Vector2.js';
import { SliderFactory } from './SliderFactory.js';

const canvas = document.getElementById('canvas1');
canvas.width = 680;
canvas.height = 580;
const ctx = canvas.getContext('2d');

let value = 15;
window.addEventListener('load', function () {
    const slider = document.getElementById('slider1');
    slider.value = value;
    const label = document.getElementById('value1');
    label.innerHTML = value;
    slider.addEventListener('change', function (e) {
        value = e.target.value;
        label.innerHTML = value;
        console.log(value);
    })
})

const slider2 = document.getElementById('slider2');
const label2 = document.getElementById('value2');
var range2 = new Slider(35, slider2, label2);
window.addEventListener('load', function () {
    range2.onLoad();
    slider2.addEventListener('change', function (e) {
        range2.value = e.target.value;
        slider2.value = e.target.value;
        label2.innerHTML = slider2.value;
        console.log(range2.value);
    })
})

var gameFactory = new SliderFactory(ctx
    , new Vector2(canvas.width, canvas.height));
var game = new Game(ctx
    , new Vector2(canvas.width, canvas.height)
    , gameFactory);

function animate(timestamp) {
    game.update(timestamp);
    game.draw();
    requestAnimationFrame(animate);
};

animate(0);