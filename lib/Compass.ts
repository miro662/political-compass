export default interface Compass {
  id: string;
  name: string;
}

export const loadCompassFromJson: (json: string) => Compass = (json) => {
  const parsedJson = JSON.parse(json) as Compass; // TODO: validation
  return parsedJson;
};
