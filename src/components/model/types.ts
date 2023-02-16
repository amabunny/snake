export type SnakeHead = {
  type: 'head'
}

export type SnakeBlock = {
  type: 'snakeBlock'
};

export type SizeIncreaser = {
  type: 'snakeIncreaser'
}

export type BarrierBlock = {
  type: 'barrierBlock'
}

export type FreeSpace = {
  type: 'freeSpace'
}

export type Direction = 'LEFT' | 'RIGHT' | 'DOWN' | 'UP'

export type Sheet = Array<Array<Block>>

export type Sizes = 8 | 16 | 32;

export type Coord = {
  x: number,
  y: number
}

export type Block = 
  | SnakeHead
  | SnakeBlock
  | SizeIncreaser
  | BarrierBlock
  | FreeSpace