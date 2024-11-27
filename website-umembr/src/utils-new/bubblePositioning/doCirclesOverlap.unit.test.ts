import { describe, expect } from '@jest/globals';
import doCirclesOverlap from "./doCirclesOverlap";
import { Position } from "./interfaces";

describe('doCirclesOverlap', () => {
  const diameter = 100;
  const margin = 15;
  test('Circles fully overlap', () => {
    const circle1: Position = {
      x: 0,
      y: 0,
    };
    const circle2: Position = {
      x: 0,
      y: 0,
    };
    const overlap = doCirclesOverlap(circle1, circle2, diameter, margin);
    expect(overlap).toBe(true);
  })
  test('Circles partially overlap', () => {
    const circle1: Position = {
      x: 0,
      y: 0,
    };
    const circle2: Position = {
      x: diameter / 2,
      y: diameter / 2,
    };
    const overlap = doCirclesOverlap(circle1, circle2, diameter, margin);
    expect(overlap).toBe(true);
  })
  test('Circles touch, but do not overlap', () => {
    const circle1: Position = {
      x: 0,
      y: 0,
    };
    const circle2: Position = {
      x: diameter,
      y: diameter,
    };
    const overlap = doCirclesOverlap(circle1, circle2, diameter, margin);
    expect(overlap).toBe(false);
  })
  test('Circles do not overlap', () => {
    const circle1: Position = {
      x: 0,
      y: 0,
    };
    const circle2: Position = {
      x: 2 * diameter,
      y: 2 * diameter,
    };
    const overlap = doCirclesOverlap(circle1, circle2, diameter, margin);
    expect(overlap).toBe(false);
  })
});
