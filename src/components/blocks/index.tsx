import { useStore } from 'effector-react';
import { Stage, Layer, Rect } from 'react-konva';
import { Sizes, $snake, $food } from '../../model';

type Props = {
  size: Sizes
}

export const Blocks = ({ size }: Props) => {
  const snake = useStore($snake);
  const food = useStore($food);

  return (
    <>
      <Stage width={450} height={450}>
        <Layer>
          {Array.from({ length: size }).flatMap((_, y) => {
            return Array.from({ length: size }).map((_, x) => {
              const key = `${y}-${x}`;
              const isTail = snake.some(({ x, y }) => `${y}-${x}` === key);

              return (
                <Rect
                  x={x * 28}
                  y={y * 28}
                  fill={
                    food.x === x && food.y === y
                      ? 'yellow'
                      : isTail ? 'red' : 'grey'
                  } 
                  width={28} 
                  height={28} 
                  key={key} 
                  stroke={'white'}
                  cornerRadius={2}
                />
              )
            })
          })}
        </Layer>
      </Stage>
    </>
  )
}
