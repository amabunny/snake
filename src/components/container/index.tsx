import cn from 'classnames';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { Blocks } from '../blocks';
import { $boardSize, changeDirection, startGame, $points } from '../../model';
import styles from './style.module.css'

export const Container = () => {
  const boardSize = useStore($boardSize);
  const points = useStore($points);

  const handleStart = () => {
    startGame(boardSize);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.code) {
      case 'ArrowUp':
        changeDirection('UP')
        break;
      case 'ArrowDown':
        changeDirection('DOWN')
        break;
      case 'ArrowLeft':
        changeDirection('LEFT')
        break;
      case 'ArrowRight':
        changeDirection('RIGHT')
        break;
      default:
        break;
      }
    }

    document.body.addEventListener('keydown', handler);

    return () => {
      document.body.removeEventListener('keydown', handler);
    }
  });

  return (
    <div className={styles.container}>
      <div>
        Points: {points}
      </div>

      <br />

      <div className={cn(styles.innerLayer, { [styles['size-8']]: true })}>
        <Blocks size={boardSize} />
      </div>

      <br />

      <button onClick={handleStart}>
        Start
      </button>
    </div>
  )
}
