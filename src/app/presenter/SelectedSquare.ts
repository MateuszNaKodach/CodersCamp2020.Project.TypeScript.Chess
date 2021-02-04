export const selectedSquare = (position: Position): void => {
  console.log(`this is x: ${position.x} and y: ${position.y}`);
};

interface Position {
  x: Number;
  y: Number;
}
