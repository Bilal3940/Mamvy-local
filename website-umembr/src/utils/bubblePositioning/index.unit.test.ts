import { describe, expect } from '@jest/globals';
import positionItems from '.';
import { PositionableItem, PositionedContainer } from "./interfaces";

describe('positionItems', () => {
  const startingContainer: PositionedContainer = {
    x: 0,
    y: 0,
    width: 2000,
    height: 2000,
  };
  const circleDiameter = 200;
  const margin = 15;
  const targetDensity = 0.2;
  const maxAttempts = 100;
  const processingTimeMaxMs = 50;

  test('Position items in container, growing it as needed to place them', () => {

    const items: PositionableItem<{ id: string }>[] = new Array(1000).fill({}).map((_, index) => ({
      id: index.toString(),
    }));

    const startTime = performance.now();
    const result = positionItems([], items, startingContainer, { circleDiameter, margin, maxAttempts, targetDensity });
    const timeDiff = performance.now() - startTime;

    expect(result.netContainer.height).toBeGreaterThan(startingContainer.height);
    expect(result.positions.length).toBe(items.length);
    expect(result.itemsInLastSubcontainer.length).toBeLessThan(items.length);
    expect(timeDiff).toBeLessThan(processingTimeMaxMs);
  })
  test('Positions items taking into account the positions of preexisting items', () => {

    const items: PositionableItem<{ id: string }>[] = new Array(1000).fill({}).map((_, index) => ({
      id: index.toString(),
    }));
    const oldItems = items.splice(0, 990);
    const result = positionItems([], oldItems, startingContainer, { circleDiameter, margin, maxAttempts, targetDensity });
    const { positions: existingItems } = result;

    const newResults = positionItems(existingItems, items, startingContainer, { circleDiameter, margin, maxAttempts, targetDensity });

    expect(newResults.positions.length).toBe(items.length);
    for (let item of newResults.positions) {
      const duplicateItem = existingItems.find((existingItem) => existingItem.id === item.id);
      expect(duplicateItem).toBeUndefined();
    }
  })
})
