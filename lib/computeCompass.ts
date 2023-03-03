import Compass, { QuestionData } from "./Compass";

export default function computeCompass(
  answers: { [key: string]: string },
  compass: Compass
): { [key: string]: number } {
  // prepare result object, store biases for now
  const biases: { [key: string]: number } = compass.axes.reduce(
    (a, v) => ({ ...a, [v.id]: v.bias ?? 0 }),
    {}
  );

  // prepare answer-value mapping
  const answerValues: { [key: string]: number } = compass.answers.reduce(
    (a, answer) => ({ ...a, [answer.id]: answer.value }),
    {}
  );

  // for each answered question
  return Object.keys(answers).reduce((results, questionId) => {
    const question: QuestionData | undefined = compass.questions.find(
      (it) => it.id == questionId
    );
    const answer = answers[questionId];
    if (question !== undefined) {
      // add aquedate value for each naswer
      return Object.keys(question.weights).reduce((r, axis_id) => {
        // calculate shift by multiplicating answer's value and question's weight for given axis
        const shift = answerValues[answer] * question.weights[axis_id];
        return { ...r, [axis_id]: r[axis_id] + shift };
      }, results);
    }
    return results;
  }, biases);
}
