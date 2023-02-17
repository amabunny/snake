import { createEvent } from 'effector';
import { Coord, Direction, Sizes } from './types';

export const startGame = createEvent<Sizes>();

export const changeDirection = createEvent<Direction>();

export const changeDirectionOriginal = createEvent<Direction>();

export const gameTimeTick = createEvent();

export const moveSnake = createEvent<Coord>();

export const eatFood = createEvent<Coord>();

export const gameOver = createEvent();
