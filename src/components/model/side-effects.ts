import { sample, combine } from 'effector';
import { 
  startGame, 
  gameTimeTick, 
  moveSnake, 
  changeDirection, 
  changeDirectionOriginal 
} from './events';
import { $boardSize, $direction, $snake } from './stores';
import { Direction } from './types';

let intervalTimer: null | NodeJS.Timer = null;

startGame.watch(() => {
  if (intervalTimer) {
    clearInterval(intervalTimer);
  }

  intervalTimer = setInterval(() => {
    gameTimeTick();
  }, 500);
})

sample({
  clock: gameTimeTick,
  source: combine({
    direction: $direction,
    snake: $snake,
    size: $boardSize,
  }),
  fn: ({ direction, snake, size }) => {
    const headOffset = snake.length - 1;

    switch (direction) {
    case 'RIGHT': {
      const x = snake[headOffset].x + 1;
      const y = snake[headOffset].y;

      return {
        x: x > size ? 0 : x,
        y,
      };
    }

    case 'LEFT': {
      const x = snake[headOffset].x - 1;
      const y = snake[headOffset].y;

      return {
        x: x < 0 ? size : x,
        y,
      }
    }

    case 'UP': {
      const x = snake[headOffset].x;
      const y = snake[headOffset].y - 1
      
      return {
        x,
        y: y < 0 ? size : y,
      };
    }

    case 'DOWN': {
      const x = snake[headOffset].x;
      const y = snake[headOffset].y + 1;

      return {
        x,
        y: y > size ? 0 : y,
      };
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
