import Compass from "@/lib/Compass";
import { useReducer } from "react";
import Question from "./Question";

interface CompassState {
  answers: { [key: string]: string };
}

interface CompassActionQuestionChanged {
  type: "question-changed";
  questionId: string;
  answerId: string;
}

interface CompassActionFinished {
  type: "finished";
}

type CompassAction = CompassActionQuestionChanged | CompassActionFinished;

const compassReducer: (
  state: CompassState,
  action: CompassAction
) => CompassState = (state, action) => {
  switch (action.type) {
    case "question-changed":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.answerId },
      };
    default:
      return state;
  }
};

export default function CompassFiller({
  compass,
  onFinished,
}: {
  compass: Compass;
  onFinished: (answers: { [key: string]: string }) => void;
}) {
  const [state, dispatch] = useReducer(compassReducer, { answers: {} });
  const compassActionQuestionChanged = (questionId: string, answerId: string) =>
    dispatch({
      type: "question-changed",
      questionId,
      answerId,
    });

  const questions = compass.questions.map((question) => (
    <Question
      key={question.id}
      question={question}
      answers={compass.answers}
      selectedAnswer={state.answers[question.id]}
      onAnswerChosen={(answer) =>
        compassActionQuestionChanged(question.id, answer)
      }
    ></Question>
  ));

  const compassFinished =
    Object.keys(state.answers).length == compass.questions.length;
  const finishCompassButton = compassFinished ? (
    <button onClick={() => onFinished(state.answers)}>See results</button>
  ) : (
    <></>
  );

  return (
    <div>
      <main>{questions}</main>
      {finishCompassButton}
    </div>
  );
}
