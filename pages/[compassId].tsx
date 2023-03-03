import { GetStaticPaths, GetStaticProps } from "next";
import LocalCompassSource from "@/lib/LocalCompassSource";
import CompassSource from "@/lib/interfaces/CompassSource";
import Compass from "@/lib/Compass";
import CompassFiller from "@/components/compass/CompassFiller";
import { useState } from "react";
import Results from "@/components/compass/Results";
import computeCompass from "@/lib/computeCompass";
import Layout from "@/components/Layout";

export default function CompassPage({ compass }: CompassPageProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string } | null>(
    null
  );
  return (
    <Layout>
      <h1>{compass.name}</h1>
      {compass.description ? <section>{compass.description}</section> : <></>}
      <CompassFiller compass={compass} onFinished={setAnswers} />
      {answers !== null ? (
        <Results results={computeCompass(answers, compass)} compass={compass} />
      ) : (
        <></>
      )}
    </Layout>
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
