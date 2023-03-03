export default interface Compass {
  id: string;
  name: string;
  description?: string;

  axes: AxesData[];
  answers: AnswerData[];
  questions: QuestionData[];
}

export interface AnswerData {
  id: string;
  name: string;
  value: string;
}

export interface AxesData {
  id: string;
  name: string;
  bias?: number;
}

export interface QuestionData {
  id: string;
  content: string;
  weights: { [key: string]: number };
}

export const loadCompassFromJson: (json: string) => Compass = (json) => {
  const parsedJson = JSON.parse(json) as Compass; // TODO: validation
  return parsedJson;
};
