import { Coord, Direction, Sizes } from './types';
import { moveSnake, startGame, changeDirectionOriginal } from './events';
import { createStore } from 'effector';

export const $snake = createStore([] as Array<Coord>)
  .on(startGame, (_, size) => [
    { x: size / 2, y: size / 2 },
    { x: size / 2 - 1, y: size / 2 }
  ])
  .on(moveSnake, ([_, ...state], coord) => [...state, coord])

export const food = createStore({
  x: 0,
  y: 0,
});

export const $boardSize = createStore<Sizes>(16)
  .on(startGame, (_, payload) => payload)

export const $direction = createStore<Direction>('RIGHT')
  .on(changeDirectionOriginal, (_, payload) => payload);