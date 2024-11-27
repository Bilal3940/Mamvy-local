import { Position, PositionedContainer } from "./interfaces";

function intersectingAreaOfCircle(radius: number, position: Position, container: PositionedContainer) {
  const distance = container.y - position.y;

  //  The circle is fully outside the rectangle
  if (distance >= radius) {
    return 0;
  }
  // The circle is fully inside the rectangle
  if (Math.abs(distance) >= radius) {
    return Math.PI * (radius ** 2);
  }

  //  If distance is negative, the arc is outside the rectangle
  const arcHeight = distance > 0 ? radius - distance : radius + distance;

  // Formula from wikipedia: https://en.wikipedia.org/wiki/Circular_segment
  const circularSegmentArea =
    (radius ** 2) * Math.acos(1 - arcHeight / radius) -
    (radius - arcHeight) * Math.sqrt((radius ** 2) - ((radius - arcHeight) ** 2));
  if (distance < 0) {
    const circleArea = Math.PI * (radius ** 2);
    return circleArea - circularSegmentArea;
  }

  return circularSegmentArea;
}

export default intersectingAreaOfCircle;
