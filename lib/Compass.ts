export default interface Compass {
  id: string;
  name: string;
  description?: string;

  answers: AnswerData[];
  questions: QuestionData[];
}

export interface AnswerData {
  id: string;
  name: string;
  value: string;
}

export interface QuestionData {
  id: string;
  content: string;
}

export const loadCompassFromJson: (json: string) => Compass = (json) => {
  const parsedJson = JSON.parse(json) as Compass; // TODO: validation
  return parsedJson;
};
