import { GetStaticPaths, GetStaticProps } from "next";
import LocalCompassSource from "@/lib/LocalCompassSource";
import CompassSource from "@/lib/interfaces/CompassSource";
import Compass from "@/lib/Compass";
import AnswerChooser from "@/components/AnswerChooser";
import { useState } from "react";
import Question from "@/components/Question";

export default function CompassPage({ compass }: CompassPageProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const questions = compass.questions.map((question) => (
    <Question
      key={question.id}
      question={question}
      answers={compass.answers}
      selectedAnswer={answers[question.id]}
      onAnswerChosen={(answer) => {
        setAnswers({ ...answers, [question.id]: answer });
      }}
    ></Question>
  ));

  return (
    <>
      <h1>{compass.name}</h1>
      <main>{questions}</main>
    </>
  );
}

interface CompassPageProps {
  compass: Compass;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const compassSource: CompassSource = LocalCompassSource;
  const compassSummaries = await compassSource.getAvailableCompasses();
  return {
    paths: compassSummaries.map(({ id }) => ({ params: { compassId: id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  CompassPageProps,
  { compassId: string }
> = async ({ params }) => {
  const compassSource: CompassSource = LocalCompassSource;
  const compassId = params!.compassId;
  const compass = (await compassSource.getCompass(compassId))!;
  return {
    props: { compass },
  };
};
