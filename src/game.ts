// Interfaces

export const gameProps = {
  width: 400,
  height: 800,
  pipeWidth: 50,
  pipeGap: 150,
  minTopForTopPipe: 70,
  maxTopForTopPipe: 350,
  speed: 1,
  generatedNewPipePercent: 0.7,
  groundHeight: 20,
  birdX: 40,
  birdSize: 20,
  gravity: 1.5,
  jumpVelocity: 10,
  slowVelocityBy: 0.3,
};

interface Frame {
  firstPipe: PipePair;
  secondPipe: PipePair;

  gameOver: boolean;
  gameStarted: boolean;
  width: number;
  height: number;
  score: number;
  ground: Ground;
  bird: Bird;
}

interface Ground {
  height: number;
}

interface Pipe {
  top: number;
  height: number;
}

export interface Bird {
  top: number;
  left: number;
  size: number;
}

export interface PipePair {
  topPipe: Pipe;
  bottomPipe: Pipe;
  show: boolean;
  left: number;
  width: number;
}

//Functions

let frame: Frame;
let velocity = 0;

let firstPipe = null;
let secondPipe = null;

const getRandomYForTopPipe = (): number => {
  return (
    gameProps.minTopForTopPipe +
    (gameProps.maxTopForTopPipe - gameProps.minTopForTopPipe) * Math.random()
  );
};

const createPipe = (show: boolean): PipePair => {
  const height = getRandomYForTopPipe();
  return {
    topPipe: {
      top: 0,
      height,
    },
    bottomPipe: {
      top: height + gameProps.pipeGap,
      height: gameProps.height,
    },
    left: gameProps.width - gameProps.pipeWidth,
    width: gameProps.pipeWidth,
    show,
  };
};

export const jump = () => {
  if (velocity <= 0) {
    velocity += gameProps.jumpVelocity;
  }
};

export const newGame = () => {
  firstPipe = createPipe(true);
  secondPipe = createPipe(false);

  frame = {
    firstPipe,
    secondPipe,
    gameOver: false,
    gameStarted: false,
    width: gameProps.width,
    height: gameProps.height,
    score: 0,
    ground: {
      height: gameProps.groundHeight,
    },
    bird: {
      top: gameProps.height / 2 - gameProps.birdSize / 2,
      left: gameProps.birdX,
      size: gameProps.birdSize,
    },
  };
  return frame;
};

const checkPipe = (left: number) => {
  return (
    left <= gameProps.birdX + gameProps.birdSize &&
    left + gameProps.pipeWidth >= gameProps.birdX
  );
};

const hasCollidedWithPipe = () => {
  if (frame.firstPipe.show && checkPipe(frame.firstPipe.left)) {
    return !(
      frame.bird.top > frame.firstPipe.topPipe.height &&
      frame.bird.top + gameProps.birdSize < frame.firstPipe.bottomPipe.top
    );
  }

  if (frame.secondPipe.show && checkPipe(frame.secondPipe.left)) {
    return !(
      frame.bird.top > frame.secondPipe.topPipe.height &&
      frame.bird.top + gameProps.birdSize < frame.secondPipe.bottomPipe.top
    );
  }

  return false;
};

const movePipe = (pipe: PipePair, nextPipe: PipePair) => {
  if (pipe.show && pipe.left <= gameProps.pipeWidth * -1) {
    pipe.show = false;
    return pipe;
  }

  if (pipe.show) {
    pipe.left -= gameProps.speed;
  }

  if (
    nextPipe.left < gameProps.width * (1 - gameProps.generatedNewPipePercent) &&
    nextPipe.show &&
    !pipe.show
  ) {
    return createPipe(true);
  }
  console.log(pipe, "pipe");
  console.log(nextPipe, "nextPipe");
  return pipe;
};

export const nextFrame = () => {
  if (frame.gameOver || !frame.gameStarted) {
    return frame;
  }
  frame.firstPipe = movePipe(frame.firstPipe, frame.secondPipe);
  frame.secondPipe = movePipe(frame.secondPipe, frame.firstPipe);

  if (velocity > 0) {
    velocity -= gameProps.slowVelocityBy;
  }

  if (hasCollidedWithPipe()) {
    frame.gameOver = true;
    return frame;
  }

  if (
    frame.bird.top >=
    gameProps.height - gameProps.groundHeight - gameProps.birdSize
  ) {
    frame.bird.top =
      gameProps.height - gameProps.groundHeight - gameProps.birdSize;
    frame.gameOver = true;
    return frame;
  }
  if (
    frame.firstPipe.left + gameProps.pipeWidth ==
      gameProps.birdX - gameProps.speed ||
    frame.secondPipe.left + gameProps.pipeWidth ==
      gameProps.birdX - gameProps.speed
  ) {
    frame.score += 1;
  }

  frame.bird.top += Math.pow(gameProps.gravity, 2) - velocity;

  return frame;
};

export const start = () => {
  newGame();
  frame.gameStarted = true;
  return frame;
};
