import { Position, PositionedContainer } from "./interfaces";

function isInsideForbiddenArea(circle: Position, radius: number, rectangle: PositionedContainer, margin: number) {

  //  Distance from center of circle to center of rectangle
  const distanceX = Math.abs(circle.x - (rectangle.x + rectangle.width / 2));
  const distanceY = Math.abs(circle.y - (rectangle.y + rectangle.height / 2));

  if (distanceX > rectangle.width / 2 + radius + margin) return false;
  if (distanceY > rectangle.height / 2 + radius + margin) return false;

  if (distanceX <= rectangle.width / 2 + margin) return true;
  if (distanceY <= rectangle.height / 2 + margin) return true;

  const cornerDistanceSquared =
    (distanceX - rectangle.width / 2 - margin) ** 2 +
    (distanceY - rectangle.height / 2 - margin) ** 2;
  return cornerDistanceSquared <= radius ** 2;
};

export default isInsideForbiddenArea;
