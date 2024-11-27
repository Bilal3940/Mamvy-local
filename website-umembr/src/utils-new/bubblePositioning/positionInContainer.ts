import { calculateForbiddenAreaOverlap } from "./calculateForbiddenAreaOverlap";
import doCirclesOverlap from "./doCirclesOverlap";
import { PositionableItem, PositionedContainer, PositionedItem } from "./interfaces";
import intersectingAreaOfCircle from "./intersectingAreaOfCircle";
import isInsideForbiddenArea from "./isInsideForbiddenArea";

function positionInContainer<T extends { [key: string]: unknown }>(
  existingPositions: PositionedItem<T>[],
  newItems: PositionableItem<T>[],
  container: PositionedContainer,
  opts: {
    targetDensity: number,
    circleDiameter: number,
    margin: number,
    maxAttempts: number,
  },
  forbiddenArea?: PositionedContainer,
) {
  const { circleDiameter, targetDensity, margin, maxAttempts } = opts;
  const radius = circleDiameter / 2;

  const circleArea = Math.PI * (radius ** 2);
  const currentContainerArea = container.width * container.height;
  const forbiddenAreaValue = forbiddenArea ? calculateForbiddenAreaOverlap(container, forbiddenArea) : 0
  const effectiveContainerArea = currentContainerArea - forbiddenAreaValue
  let preOccupiedArea = existingPositions.reduce((area, position) => {
    return area + intersectingAreaOfCircle(radius, position, container);
  }, 0)

  let currentDensity = preOccupiedArea / effectiveContainerArea;

  if (currentDensity >= targetDensity) return {
    positions: [],
    unplacedItems: newItems,
    density: currentDensity
  }

  const newPositions: PositionedItem<T>[] = [];

  let mostAttempts = 0;
  const unplacedItems = [...newItems];
  let item = unplacedItems.shift();
  const positionedItems = [...existingPositions];
  while (item && currentDensity < targetDensity) {
    let attempts = 0;
    while (attempts < maxAttempts) {
      attempts++;
      const position = {
        x: container.x + radius + Math.random() * (container.width - circleDiameter),
        y: container.y + radius + Math.random() * (container.height - circleDiameter),
      }

      if (forbiddenArea && isInsideForbiddenArea(position, radius, forbiddenArea, margin)) continue;
      if (positionedItems.some((existingPosition) => doCirclesOverlap(position, existingPosition, circleDiameter, margin))) continue;

      preOccupiedArea += circleArea;
      currentDensity = preOccupiedArea / effectiveContainerArea;
      newPositions.push({ ...item, ...position })
      positionedItems.push({ ...item, ...position });
      break;
    }
    mostAttempts = Math.max(attempts, mostAttempts);
    if (attempts >= maxAttempts) {
      console.warn(`Failed to place item in container after ${maxAttempts} attempts, most attempts ${mostAttempts}. Placement deferred to next container.`);
      unplacedItems.unshift(item);
      break;
    }
    item = currentDensity < targetDensity ? unplacedItems.shift() : undefined;
  };


  return {
    positions: newPositions,
    unplacedItems,
    density: currentDensity
  }
}

export default positionInContainer;