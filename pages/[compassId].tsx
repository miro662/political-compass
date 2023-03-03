import { GetStaticPaths, GetStaticProps } from "next";
import LocalCompassSource from "@/lib/LocalCompassSource";
import CompassSource from "@/lib/interfaces/CompassSource";
import Compass from "@/lib/Compass";

export default function CompassPage({ compass }: CompassPageProps) {
  <h1>{compass.name}</h1>;
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
