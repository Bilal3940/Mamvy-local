import { PositionedContainer } from "./interfaces";

export function calculateForbiddenAreaOverlap(rootContainer: PositionedContainer, forbiddenArea: PositionedContainer) {
  // All cases assume the root container is wider than the forbidden area container
  // All cases assume the forbidden area is always between rootContainer.x and rootContainer.x + rootContainer.width
  // Forbidden area may be taller than root container
  // Forbidden area is completely outside of root container
  if ((forbiddenArea.y < rootContainer.y && forbiddenArea.y + forbiddenArea.height <= rootContainer.y)
    || forbiddenArea.y >= rootContainer.y + rootContainer.height) {
    return 0;
  }

  // Forbidden area is completely inside of root container
  if (forbiddenArea.y >= rootContainer.y && forbiddenArea.y + forbiddenArea.height <= rootContainer.y + rootContainer.height) {
    return forbiddenArea.height * forbiddenArea.width;
  }

  // Forbidden area is partially inside of root container
  if (forbiddenArea.y < rootContainer.y && forbiddenArea.y + forbiddenArea.height <= rootContainer.y + rootContainer.height) {
    return (((forbiddenArea.y + forbiddenArea.height) - rootContainer.y) * forbiddenArea.width);
  }
  if (forbiddenArea.y > rootContainer.y && forbiddenArea.y < rootContainer.y + rootContainer.height) {
    return ((forbiddenArea.y - (rootContainer.y + rootContainer.height)) * forbiddenArea.width);
  }

  // Should be unreachable
  return 0;
}
