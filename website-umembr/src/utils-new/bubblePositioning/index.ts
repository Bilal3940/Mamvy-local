import { PositionableItem, PositionedContainer, PositionedItem } from "./interfaces";
import positionInContainer from "./positionInContainer";

function positionItems<T extends { [key: string]: unknown }>(
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
): {
  positions: PositionedItem<T>[],
  netContainer: PositionedContainer,
  lastSubcontainer: PositionedContainer
  itemsInLastSubcontainer: PositionedItem<T>[],
} {
  let itemsToPlace = newItems;
  let lastSubcontainer = container;
  let itemsInLastSubcontainer: PositionedItem<T>[] = [...existingPositions];
  const netContainer = { ...container };
  const positions: PositionedItem<T>[] = [];
  do {
    const result = positionInContainer(itemsInLastSubcontainer, itemsToPlace, lastSubcontainer, opts, forbiddenArea);
    itemsToPlace = result.unplacedItems;
    itemsInLastSubcontainer.push(...result.positions);
    positions.push(...result.positions);
    if (itemsToPlace.length > 0) {
      const verticalOverlap = 0.3 * lastSubcontainer.height;
      lastSubcontainer = {
        x: lastSubcontainer.x,
        y: lastSubcontainer.y + lastSubcontainer.height - verticalOverlap,
        width: lastSubcontainer.width,
        height: (opts.circleDiameter + 2 * opts.margin) * 3,
      }
      itemsInLastSubcontainer = itemsInLastSubcontainer.filter(item => item.y + opts.circleDiameter / 2 + opts.margin > lastSubcontainer.y);
      netContainer.height += lastSubcontainer.height - verticalOverlap;
    }
  } while (itemsToPlace.length > 0);

  positions.sort((a, b) => a.y - b.y);

  return {
    positions,
    netContainer,
    lastSubcontainer,
    itemsInLastSubcontainer,
  };
}

export default positionItems;
