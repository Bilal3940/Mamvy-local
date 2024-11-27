import { describe, expect } from '@jest/globals';
import { PositionableItem, PositionedContainer } from "./interfaces";
import positionInContainer from "./positionInContainer";
import isInsideForbiddenArea from './isInsideForbiddenArea';
import doCirclesOverlap from './doCirclesOverlap';

describe('positionInContainer', () => {
  const container: PositionedContainer = {
    x: 0,
    y: 0,
    width: 2000,
    height: 2000,
  };
  const circleDiameter = 200;
  const margin = 15;
  const targetDensity = 0.2;
  const densityDelta = 0.05;
  const maxAttempts = 100;

  test('Position items in container until target density is reached', () => {
    const items: PositionableItem<{ id: string }>[] = new Array(1000).fill({}).map((_, index) => ({
      id: index.toString(),
    }));

    const result = positionInContainer([], items, container, { circleDiameter, margin, maxAttempts, targetDensity });

    expect(result.density).toBeGreaterThanOrEqual(targetDensity);
    expect(result.density).toBeLessThan((targetDensity + densityDelta));
    expect(result.positions.length).toBeGreaterThan(0);
    expect(result.unplacedItems.length).toBeGreaterThan(0);
    expect(result.positions.length + result.unplacedItems.length).toBe(items.length);
  });
  test('Position items in container until target density is reached with a forbidden area', () => {
    const width = 400;
    const height = 400;
    const forbiddenArea: PositionedContainer = {
      x: container.x + container.width / 2 - width / 2,
      y: container.y + container.width / 2 - height / 2,
      width,
      height,
    };
    const items: PositionableItem<{ id: string }>[] = new Array(1000).fill({}).map((_, index) => ({
      id: index.toString(),
    }));
    const result = positionInContainer([], items, container, { circleDiameter, margin, maxAttempts, targetDensity }, forbiddenArea);
    const resultWithoutForbiddenArea = positionInContainer([], items, container, { circleDiameter, margin, maxAttempts, targetDensity });

    expect(result.density).toBeGreaterThanOrEqual(targetDensity);
    expect(result.density).toBeLessThan((targetDensity + densityDelta));
    expect(result.positions.length).toBeGreaterThan(0);
    expect(result.positions.length + result.unplacedItems.length).toBe(items.length);


    expect(resultWithoutForbiddenArea.density).toBeGreaterThanOrEqual(targetDensity);
    expect(resultWithoutForbiddenArea.density).toBeLessThan((targetDensity + densityDelta));
    expect(resultWithoutForbiddenArea.positions.length).toBeGreaterThan(result.positions.length);
    expect(resultWithoutForbiddenArea.positions.length + resultWithoutForbiddenArea.unplacedItems.length).toBe(items.length);
  })
  test('Position less items than needed to reach target density', () => {
    const items: PositionableItem<{ id: string }>[] = new Array(5).fill({}).map((_, index) => ({
      id: index.toString(),
    }));

    const result = positionInContainer([], items, container, { circleDiameter, margin, maxAttempts, targetDensity });

    expect(result.density).toBeLessThan((targetDensity));
    expect(result.positions.length).toBe(items.length)
    expect(result.unplacedItems.length).toBe(0);
  })
  test('Position items in a container with existing items', () => {
    const items: PositionableItem<{ id: string }>[] = new Array(1000).fill({}).map((_, index) => ({
      id: index.toString(),
    }));
    const splicedItems = items.splice(0, 10);
    const positionedItems = positionInContainer([], splicedItems, container, { circleDiameter, margin, maxAttempts, targetDensity }).positions;
    const result = positionInContainer(positionedItems, items, container, { circleDiameter, margin, maxAttempts, targetDensity });

    expect(positionedItems.length).toBe(splicedItems.length);
    expect(result.density).toBeGreaterThanOrEqual(targetDensity);
    expect(result.density).toBeLessThan((targetDensity + densityDelta));
    expect(result.positions.length).toBeGreaterThan(0);
    expect(result.unplacedItems.length).toBeGreaterThan(0);
    expect(result.positions.length + result.unplacedItems.length).toBe(items.length);
    for (let item of result.positions) {
      const duplicate = positionedItems.find((positionedItem) => positionedItem.id === item.id);
      expect(duplicate).toBeUndefined();
    }
  })
  test('Position items in an offset container', () => {
    const items: PositionableItem<{ id: string }>[] = new Array(1000).fill({}).map((_, index) => ({
      id: index.toString(),
    }));

    const result = positionInContainer([], items, { x: 500, y: 500, width: 2000, height: 2000 }, { circleDiameter, margin, maxAttempts, targetDensity });

    expect(result.density).toBeGreaterThanOrEqual(targetDensity);
    expect(result.density).toBeLessThan((targetDensity + densityDelta));
    expect(result.positions.length).toBeGreaterThan(0);
    expect(result.unplacedItems.length).toBeGreaterThan(0);
    expect(result.positions.length + result.unplacedItems.length).toBe(items.length);
    for (let position of result.positions) {
      expect(position.x).toBeGreaterThanOrEqual(500 + circleDiameter / 2);
      expect(position.y).toBeGreaterThanOrEqual(500 + circleDiameter / 2);
      expect(position.x).toBeLessThanOrEqual(500 + container.width - circleDiameter / 2);
      expect(position.y).toBeLessThanOrEqual(500 + container.height - circleDiameter / 2);
    }
  })

  test('No items in forbidden area', () => {
    const items: PositionableItem<{ id: string }>[] = new Array(1000).fill({}).map((_, index) => ({
      id: index.toString(),
    }));
    const width = 400;
    const height = 400;
    const forbiddenArea: PositionedContainer = {
      x: container.x + container.width / 2 - width / 2,
      y: container.y + container.width / 2 - height / 2,
      width,
      height,
    };
    const result = positionInContainer([], items, container, { circleDiameter, margin, maxAttempts, targetDensity }, forbiddenArea);
    expect(result.density).toBeGreaterThanOrEqual(targetDensity);
    expect(result.density).toBeLessThan((targetDensity + densityDelta));
    expect(result.positions.length).toBeGreaterThan(0);
    expect(result.unplacedItems.length).toBeGreaterThan(0);
    expect(result.positions.length + result.unplacedItems.length).toBe(items.length);
    for (let position of result.positions) {
      expect(isInsideForbiddenArea(position, circleDiameter / 2, forbiddenArea, margin)).toBe(false);
    }
  })

  test('No circles overlap', () => {
    const items: PositionableItem<{ id: string }>[] = new Array(1000).fill({}).map((_, index) => ({
      id: index.toString(),
    }));
    const result = positionInContainer([], items, container, { circleDiameter, margin, maxAttempts, targetDensity });
    expect(result.density).toBeGreaterThanOrEqual(targetDensity);
    expect(result.density).toBeLessThan((targetDensity + densityDelta));
    expect(result.positions.length).toBeGreaterThan(0);
    expect(result.unplacedItems.length).toBeGreaterThan(0);
    expect(result.positions.length + result.unplacedItems.length).toBe(items.length);
    for (let index = 0; index < result.positions.length; index++) {
      const position = result.positions[index];
      for (let otherIndex = 0; otherIndex < result.positions.length; otherIndex++) {
        if (index === otherIndex) continue;
        const otherPosition = result.positions[otherIndex];
        expect(doCirclesOverlap(position, otherPosition, circleDiameter, margin)).toBe(false);
      }
    }
  })
})