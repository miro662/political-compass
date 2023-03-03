import Head from "next/head";
import { GetStaticProps } from "next";
import LocalCompassSource from "@/lib/LocalCompassSource";
import CompassSource, { CompassSummary } from "@/lib/interfaces/CompassSource";
import Link from "next/link";

export default function Home({ compasses }: { compasses: CompassSummary[] }) {
  const compassList = compasses.map(({ id, name }) => (
    <li key={name}>
      <Link href={id}>{name}</Link>
    </li>
  ));
  return (
    <>
      <Head>
        <title>Political Compass</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Available compasses:</h1>
        <ul>{compassList}</ul>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const compassSource: CompassSource = LocalCompassSource;
  const compasses = await compassSource.getAvailableCompasses();

  return {
    props: { compasses },
  };
};
