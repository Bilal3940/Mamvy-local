import { describe, expect } from '@jest/globals';
import { Position, PositionedContainer } from "./interfaces";
import isInsideForbiddenArea from './isInsideForbiddenArea';
describe('isInsideForbiddenArea', () => {
  const radius = 100;
  const margin = 0;
  const delta = 0.01;
  const container: PositionedContainer = {
    x: 0,
    y: 0,
    width: 10 * radius,
    height: 10 * radius,
  };
  test('Circle is fully outside the rectangle', () => {
    const circlePosition: Position = {
      x: 0,
      y: - (radius + margin + delta),
    };
    const isInArea = isInsideForbiddenArea(circlePosition, radius, container, margin);
    expect(isInArea).toBe(false);
  })
  test('Circle is fully inside the rectangle', () => {
    const circlePosition: Position = {
      x: 0,
      y: 0,
    };
    const isInArea = isInsideForbiddenArea(circlePosition, radius, container, margin);
    expect(isInArea).toBe(true);
  })
  test('Circle is mostly inside the rectangle', () => {
    const circlePosition: Position = {
      x: radius,
      y: radius / 2
    };
    const isInArea = isInsideForbiddenArea(circlePosition, radius, container, margin);
    expect(isInArea).toBe(true);
  })
  test('Circle is near a corner of the rectangle, within the margin', () => {
    const circlePosition: Position = {
      x: container.x + radius,
      y: container.y + radius,
    };
    const isInArea = isInsideForbiddenArea(circlePosition, radius, container, margin);
    expect(isInArea).toBe(true);
  })
  test('Circle is near a corner of the rectangle, outside the margin', () => {
    const circlePosition: Position = {
      x: container.x + container.width + radius + margin + delta,
      y: container.y + container.height + radius + margin + delta,
    };
    const isInArea = isInsideForbiddenArea(circlePosition, radius, container, margin);
    expect(isInArea).toBe(false);
  })
})