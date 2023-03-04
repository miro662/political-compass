import { AnswerData, QuestionData } from "@/lib/Compass";
import { useState } from "react";
import AnswerChooser from "./AnswerChooser";

export default function Question({
  question,
  questionInfo,
  answers,
  selectedAnswer,
  onAnswerChosen,
}: {
  question: QuestionData;
  questionInfo?: string;
  answers: AnswerData[];
  selectedAnswer: string | undefined;
  onAnswerChosen: (answerId: string) => void;
}) {
  return (
    <section className="group">
      <div className="border-l-8 border-slate-300 pl-2 pt-1 text-sm tracking-wider">
        {questionInfo ?? ""}
      </div>
      <div className="border-l-8 border-slate-300 pl-2 pb-2 font-serif text-lg tracking-wider">
        {question.content}
      </div>
      <AnswerChooser
        selectedAnswer={selectedAnswer}
        onAnswerChosen={onAnswerChosen}
        answers={answers}
      />
    </section>
  );
}
