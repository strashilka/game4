export enum ItemColors {
    None = 'white',
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
    Yellow = 'yellow',
    Purple = 'purple',
    Orange = 'orange'
}

export type ItemColorWithId = {
    id: number,
    color: ItemColors
}

export function randomColor(): ItemColors {
  const itemEnumValues = Object.values(ItemColors);
  const randomIndex = Math.floor(Math.random() * (itemEnumValues.length - 1)) + 1;
  const randomEnumValue = itemEnumValues[randomIndex] as ItemColors;

  return randomEnumValue;
}

export enum FeedbackColors {
    None = 'white',
    ColorPosition = 'black',
    Color = 'lightgrey',
    Question = 'grey'
}

export type FeedbackColorWithId = {
    id: number,
    color: FeedbackColors
}
