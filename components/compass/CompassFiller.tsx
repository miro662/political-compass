import Compass from "@/lib/Compass";
import { useEffect, useReducer } from "react";
import Question from "./Question";

interface CompassState {
  answers: { [key: string]: string };
  scroll: boolean;
}

interface CompassActionQuestionChanged {
  type: "question-changed";
  questionId: string;
  answerId: string;
}

interface CompassActionFinished {
  type: "finished";
}

interface CompassActionScrolled {
  type: "scrolled";
}

type CompassAction =
  | CompassActionQuestionChanged
  | CompassActionFinished
  | CompassActionScrolled;

const compassReducer: (
  state: CompassState,
  action: CompassAction
) => CompassState = (state, action) => {
  switch (action.type) {
    case "question-changed":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.answerId },
        scroll: state.answers[action.questionId] === undefined,
      };
    case "scrolled":
      return {
        ...state,
        scroll: false,
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
  const [state, dispatch] = useReducer(compassReducer, {
    answers: {},
    scroll: false,
  });
  const dispatchQuestionChanged = (questionId: string, answerId: string) =>
    dispatch({
      type: "question-changed",
      questionId,
      answerId,
    });
  const dispatchScrolled = () =>
    dispatch({
      type: "scrolled",
    });

  if (state.scroll) {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    dispatchScrolled();
  }

  const answeredQuestions = Object.keys(state.answers).length;
  const questions = compass.questions.map((question, idx) => (
    <div
      key={question.id}
      className={`transition-opacity duration-1000 ${
        idx <= answeredQuestions
          ? "opacity-100"
          : idx - 1 == answeredQuestions
          ? "opacity-0"
          : "hidden" // invisible
      }`}
    >
      {idx != 0 ? <div className="h-12 border-l-8 border-slate-200"></div> : ""}
      <Question
        question={question}
        questionInfo={`Pytanie ${idx + 1}/${compass.questions.length}`}
        answers={compass.answers}
        selectedAnswer={state.answers[question.id]}
        onAnswerChosen={(answer) =>
          dispatchQuestionChanged(question.id, answer)
        }
      ></Question>
    </div>
  ));

  const compassFinished =
    Object.keys(state.answers).length == compass.questions.length;

  return (
    <div>
      {questions}
      <div
        className={`transition-opacity duration-1000 ${
          compassFinished ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-12 border-l-8 border-slate-200"></div>
        <button
          className="sm:p-0transition-colors border-l-8 border-slate-300 p-2 hover:border-slate-400 hover:underline sm:p-0 sm:pl-2"
          onClick={() => onFinished(state.answers)}
        >
          zobacz wyniki
        </button>
      </div>
    </div>
  );
}
