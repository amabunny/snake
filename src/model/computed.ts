import { $snake } from './stores';

export const $snakeHead = $snake.map((snake) => snake[snake.length - 1]);

export const $snakeTail = $snake.map((snake) => snake[0]);
