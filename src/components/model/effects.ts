import { createEffect } from 'effector';
import { Coord, Sizes } from './types';

type GenerateFoodPlacementParams = {
  snake: Coord[]
  boardSize: Sizes
}

export const generateFoodPlacement = createEffect({
  handler: ({ boardSize, snake }: GenerateFoodPlacementParams) => {
    const freeSpaces = Array.from({ length: boardSize }).flatMap((_, y) => 
      Array.from({ length: boardSize}).map((_, x) => ({ x, y })).filter((_, x) => {
        return !snake.some((coord) => coord.x === x && coord.y === y);
      })
    )

    return freeSpaces[Math.round(Math.random() * freeSpaces.length)];
  }
})
