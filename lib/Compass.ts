export default interface Compass {
  id: string;
  name: string;
  description?: string;

  answers: Answer[];
}

export interface Answer {
  id: string;
  name: string;
  value: string;
}

export const loadCompassFromJson: (json: string) => Compass = (json) => {
  const parsedJson = JSON.parse(json) as Compass; // TODO: validation
  return parsedJson;
};
