import { Coord, Direction, Sizes } from './types';
import { moveSnake, startGame, changeDirectionOriginal, gameOver, eatFood } from './events';
import { createStore } from 'effector';
import { generateFoodPlacement } from './effects';

export const $snake = createStore([] as Array<Coord>)
  .on(startGame, (_, size) => [
    { 
      x: size / 2, 
      y: size / 2 
    },
    { 
      x: size / 2 - 1, 
      y: size / 2 
    }
  ])
  .on(moveSnake, ([_, ...state], coord) => [...state, coord])
  .on(eatFood, (state, newSnakeTail) => [newSnakeTail, ...state])
  .reset(gameOver)

export const $food = createStore({ x: -1, y: -1 })
  .on(generateFoodPlacement.doneData, (_, place) => place)
  .reset(gameOver);

export const $boardSize = createStore<Sizes>(16)
  .on(startGame, (_, payload) => payload)

export const $direction = createStore<Direction>('RIGHT')
  .on(changeDirectionOriginal, (_, payload) => payload);

export const $points = createStore<number>(0)
  .on(eatFood, (points) => points + 1)
  .reset(gameOver);