import { combine } from 'effector';
import { $snake } from './stores';

export const $snakeHead = $snake.map((snake) => snake[snake.length - 1]);

export const $snakeTail = $snake.map((snake) => snake[0]);

export const $hasCollision = combine({
  snake: $snake,
  snakeHead: $snakeHead,
}).map(({ snake, snakeHead }) => {
  const snakeWithoutHead = snake.slice(0, snake.length - 1);

  return snakeWithoutHead.some((snakeTail) => {
    return snakeHead.x === snakeTail.x && snakeHead.y === snakeTail.y;
  });
});
