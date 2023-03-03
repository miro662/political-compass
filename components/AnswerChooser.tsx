import { AnswerData } from "@/lib/Compass";

export default function AnswerChooser({
  selectedAnswer,
  answers,
  onAnswerChosen,
}: {
  selectedAnswer?: string;
  answers: AnswerData[];
  onAnswerChosen: (answerKey: string) => void;
}) {
  let answerButtons = answers.map((answer) => (
    <div key={answer.id}>
      <label key={answer.id}>
        <input
          type="radio"
          name={answer.id}
          checked={answer.id === selectedAnswer}
          onChange={() => {
            onAnswerChosen(answer.id);
          }}
        />
        {answer.name}
      </label>
    </div>
  ));
  return <form>{answerButtons}</form>;
}
