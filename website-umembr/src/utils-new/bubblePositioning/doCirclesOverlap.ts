import { Position } from "./interfaces";

function doCirclesOverlap(circle1: Position, circle2: Position, circleDiameter: number, margin: number) {
  const distance = Math.hypot(circle2.x - circle1.x, circle2.y - circle1.y);
  return distance < circleDiameter + margin;
};

export default doCirclesOverlap;
