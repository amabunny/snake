import cn from 'classnames';
import { useStore } from 'effector-react';
import { Sizes, $snake } from '../model';
import styles from './style.module.css';

type Props = {
  size: Sizes
}

export const Blocks = ({ size }: Props) => {
  const snake = useStore($snake)

  return (
    <>
      {Array.from({ length: size }).map((_, y) => {
        return Array.from({ length: size }).map((_, x) => {
          const key = `${y}-${x}`;
          const isTail = snake.some(({ x, y }) => `${y}-${x}` === key);

          return (
            <div
              className={cn(styles.block, {
                [styles.snakeBlock]: isTail
              })}
              key={key}
              data-key={key}
            />
          )
        })
      })}
    </>
  )
}
