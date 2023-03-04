import { AnswerData } from "@/lib/Compass";

function AnswerOption({
  answer,
  selected,
  color,
  onChosen,
}: {
  answer: AnswerData;
  selected?: boolean;
  color?: string;
  onChosen: () => void;
}) {
  const hoverBorderColorClass = `hover:border-${color ?? "slate"}-400`;
  const activeBorderColorClass = `border-${color ?? "slate"}-500`;
  return (
    <label key={answer.id} className="appearance-none">
      <div
        className={`border-l-8 p-2 pl-2 lowercase transition-colors hover:underline sm:pt-0 sm:pb-1 ${
          selected
            ? `${activeBorderColorClass} font-normal`
            : `${hoverBorderColorClass} border-slate-300`
        }`}
      >
        <input
          type="radio"
          name={answer.id}
          checked={selected}
          onChange={() => {
            onChosen();
          }}
          className="hidden"
        />
        <span className="drop-shadow">{answer.name}</span>
      </div>
    </label>
  );
}

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
    <AnswerOption
      key={answer.id}
      answer={answer}
      color={answer.color}
      selected={selectedAnswer === answer.id}
      onChosen={() => onAnswerChosen(answer.id)}
    />
  ));
  return <form>{answerButtons}</form>;
}
