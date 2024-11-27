import { describe, expect } from '@jest/globals';
import { Position, PositionedContainer } from "./interfaces";
import intersectingAreaOfCircle from "./intersectingAreaOfCircle";

describe('intersectingAreaOfCircle', () => {
  const container: PositionedContainer = {
    x: 0,
    y: 0,
    width: 2000,
    height: 2000,
  };
  const radius = 200;
  const delta = 0.001;
  test('Circle is exactly half outside the rectangle', () => {
    const circlePosition: Position = {
      x: radius,
      y: 0,
    };

    const intersectingArea = intersectingAreaOfCircle(radius, circlePosition, container);

    const expectedArea = Math.PI * (radius ** 2) / 2;
    expect(intersectingArea).toBeGreaterThanOrEqual(expectedArea - delta);
    expect(intersectingArea).toBeLessThanOrEqual(expectedArea + delta);
  });
  test('Circle is mostly outside the rectangle', () => {
    const circlePosition: Position = {
      x: radius,
      y: -radius / 2
    };

    const intersectingArea = intersectingAreaOfCircle(radius, circlePosition, container);

    //  Using calculator from https://www.mathopenref.com/segmentareaht.html
    const expectedArea = 24567.394;
    expect(intersectingArea).toBeGreaterThanOrEqual(expectedArea - delta);
    expect(intersectingArea).toBeLessThanOrEqual(expectedArea + delta);
  })
  test('Circle is mostly inside the rectangle', () => {
    const circlePosition: Position = {
      x: radius,
      y: radius / 2
    };

    const intersectingArea = intersectingAreaOfCircle(radius, circlePosition, container);

    //  Using calculator from https://www.mathopenref.com/segmentareaht.html
    const expectedArea = 101096.3122;
    expect(intersectingArea).toBeGreaterThanOrEqual(expectedArea - delta);
    expect(intersectingArea).toBeLessThanOrEqual(expectedArea + delta);
  })
  test('Circle is fully inside the rectangle', () => {
    const circlePosition: Position = {
      x: radius,
      y: radius
    };

    const intersectingArea = intersectingAreaOfCircle(radius, circlePosition, container);

    const expectedArea = Math.PI * (radius ** 2);
    expect(intersectingArea).toBeGreaterThanOrEqual(expectedArea - delta);
    expect(intersectingArea).toBeLessThanOrEqual(expectedArea + delta);
  })
  test('Circle is fully outside the rectangle', () => {
    const circlePosition: Position = {
      x: radius,
      y: -radius * 2
    };

    const intersectingArea = intersectingAreaOfCircle(radius, circlePosition, container);

    const expectedArea = 0;
    expect(intersectingArea).toBeGreaterThanOrEqual(expectedArea - delta);
    expect(intersectingArea).toBeLessThanOrEqual(expectedArea + delta);
  })
  test('Circle fully inside an offset container', () => {
    const circlePosition: Position = { x: 523.7695843208006, y: 1759.842889589938 };

    const intersectingArea = intersectingAreaOfCircle(200, circlePosition, container);

    const expectedArea = Math.PI * (radius ** 2);
    expect(intersectingArea).toBeGreaterThanOrEqual(expectedArea - delta);
    expect(intersectingArea).toBeLessThanOrEqual(expectedArea + delta);
  })
  test('Circle is partially inside an offset container', () => {
    const circlePosition: Position = { x: 523.7695843208006, y: 1760 };

    const intersectingArea = intersectingAreaOfCircle(200, circlePosition, { x: 0, y: 1785, width: 2000, height: 690 });

    const expectedArea = 52857.9561;
    expect(intersectingArea).toBeGreaterThanOrEqual(expectedArea - delta);
    expect(intersectingArea).toBeLessThanOrEqual(expectedArea + delta);
  })
})