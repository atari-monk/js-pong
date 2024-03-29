'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Game2 } from '../engine/game-v2.js';
import { MultiCanvasData } from '../engine/multi-canvas-data.js';
import { Menu } from './menu.js';
import { ArrowsFactory } from './arrows-factory.js';
import { MouseFactory } from './mouse-factory.js';

let game, factory;
const views = new MultiCanvasData();
const menu = new Menu(onControlsChange);
menu.setPlayerView();

function onControlsChange(value) {
  switch (value) {
    case 'kyeboard-set1':
      factory = new ArrowsFactory(views);
      break;
    case 'kyeboard-set2':
      factory = new ArrowsFactory(views);
      break;
    case 'mouse':
      factory = new MouseFactory(views);
      break;
    default:
      break;
  }
  game = new Game2(factory);
}

function animate(timestamp) {
  game.update(timestamp);
  game.draw();
  requestAnimationFrame(animate);
};

animate(0);