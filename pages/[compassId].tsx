import { GetStaticPaths, GetStaticProps } from "next";
import LocalCompassSource from "@/lib/LocalCompassSource";
import CompassSource from "@/lib/interfaces/CompassSource";
import Compass from "@/lib/Compass";
import CompassFiller from "@/components/compass/CompassFiller";
import { useEffect, useState } from "react";
import Results from "@/components/compass/Results";
import computeCompass from "@/lib/computeCompass";
import Layout from "@/components/Layout";
import { H, P } from "@/components/Repeatable";

export default function CompassPage({ compass }: CompassPageProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string } | null>(
    null
  );
  useEffect(
    () =>
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      }),
    [answers]
  );
  return (
    <Layout>
      <CompassHeader compass={compass} />
      <CompassFiller
        compass={compass}
        onFinished={(answers) => {
          setAnswers(answers);
        }}
      />
      {answers !== null ? (
        <Results results={computeCompass(answers, compass)} compass={compass} />
      ) : (
        <></>
      )}
    </Layout>
  );
}

function CompassHeader({ compass }: { compass: Compass }) {
  return (
    <div>
      <div className="mb-4 h-32 w-auto bg-slate-300 sm:h-48"></div>
      <H level={1}>{compass.name}</H>
      <P>{compass.description ?? ""}</P>
    </div>
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
