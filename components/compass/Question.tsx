import { AnswerData, QuestionData } from "@/lib/Compass";
import { useState } from "react";
import AnswerChooser from "./AnswerChooser";

export default function Question({
  question,
  answers,
  selectedAnswer,
  onAnswerChosen,
}: {
  question: QuestionData;
  answers: AnswerData[];
  selectedAnswer: string | undefined;
  onAnswerChosen: (answerId: string) => void;
}) {
  return (
    <section>
      <div>{question.content}</div>
      <AnswerChooser
        selectedAnswer={selectedAnswer}
        onAnswerChosen={onAnswerChosen}
        answers={answers}
      />
    </section>
  );
}
