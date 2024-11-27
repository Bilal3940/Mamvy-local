export interface Position {
  x: number;
  y: number;
}
export interface Dimension {
  width: number;
  height: number;
}
export type PositionedContainer = Position & Dimension;
export type PositionableItem<T extends { [key: string]: unknown }> = Partial<Position> & T;
export type PositionedItem<T extends { [key: string]: unknown }> = Position & T;
