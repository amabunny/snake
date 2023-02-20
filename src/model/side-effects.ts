import { sample, combine, guard, forward } from 'effector';
import {
  startGame,
  gameTimeTick,
  moveSnake,
  changeDirection,
  changeDirectionOriginal,
  gameOver,
  eatFood,
} from './events';
import { $hasCollision, $snakeHead, $snakeTail } from './computed';
import { $boardSize, $direction, $snake, $food } from './stores';
import { Direction } from './types';
import { generateFoodPlacement } from './effects';

let intervalTimer: null | NodeJS.Timer = null;

startGame.watch(() => {
  if (intervalTimer) {
    clearInterval(intervalTimer);
  }

  intervalTimer = setInterval(() => {
    gameTimeTick();
  }, 500);
})

gameOver.watch(() => {
  if (intervalTimer) {
    clearInterval(intervalTimer);
  }

  alert('Game over!')
})

sample({
  clock: gameTimeTick,
  source: combine({
    direction: $direction,
    snake: $snake,
    size: $boardSize,
  }),
  fn: ({ direction, snake }) => {
    const headOffset = snake.length - 1;

    switch (direction) {
    case 'RIGHT': {
      const x = snake[headOffset].x + 1;
      const y = snake[headOffset].y;

      return { x, y };
    }

    case 'LEFT': {
      const x = snake[headOffset].x - 1;
      const y = snake[headOffset].y;

      return { x, y }
    }

    case 'UP': {
      const x = snake[headOffset].x;
      const y = snake[headOffset].y - 1

      return { x, y };
    }

    case 'DOWN': {
      const x = snake[headOffset].x;
      const y = snake[headOffset].y + 1;

      return { x, y };
    }

    default: return { x: 0, y: 0 };
    }
  },
  target: moveSnake
})

sample({
  clock: changeDirection,
  source: combine({ direction: $direction }),
  fn: ({ direction }, payload): Direction => {
    if (direction === 'LEFT' && payload === 'RIGHT') return 'LEFT';
    if (direction === 'RIGHT' && payload === 'LEFT') return 'RIGHT';
    if (direction === 'DOWN' && payload === 'UP') return 'DOWN';
    if (direction === 'UP' && payload === 'DOWN') return 'UP'

    return payload;
  },
  target: changeDirectionOriginal
});

guard({
  clock: moveSnake,
  source: combine($snakeHead, $boardSize),
  filter: ([{ x, y }, boardSize]) => (
    x < 0
    || x >= boardSize 
    || y < 0
    || y >= boardSize
  ),
  target: gameOver,
})

sample({
  clock: [startGame, eatFood],
  source: combine({
    snake: $snake,
    boardSize: $boardSize
  }),
  target: generateFoodPlacement
})

const foodEaten = guard({
  clock: moveSnake,
  source: combine({
    food: $food,
    snakeHead: $snakeHead,
  }),
  filter: ({ food, snakeHead }) => (
    food.x === snakeHead.x &&
    food.y === snakeHead.y
  ),
})

sample({
  clock: foodEaten,
  source: $snakeTail,
  fn: (snakeTail) => {
    return {
      x: snakeTail.x, 
      y: snakeTail.y 
    };
    
  },
  target: eatFood
})

forward({
  from: $hasCollision,
  to: gameOver,
})
