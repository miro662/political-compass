import { GetStaticProps } from "next";
import LocalCompassSource from "@/lib/LocalCompassSource";
import CompassSource, { CompassSummary } from "@/lib/interfaces/CompassSource";
import Link from "next/link";
import Layout from "@/components/Layout";
import { PropsWithChildren } from "react";
import { Url } from "next/dist/shared/lib/router/router";

function Cards({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">{children}</div>
  );
}

function Card({
  href,
  title,
  description,
}: {
  href: Url;
  title: string;
  description?: string;
}) {
  return (
    <Link href={href}>
      <div className="transition-color group flex flex-col shadow-lg transition-transform hover:shadow-slate-300 sm:h-40 sm:flex-row md:h-72 md:flex-col md:hover:scale-105 ">
        <div className="h-20 bg-slate-300 p-2 transition-all group-hover:saturate-200 sm:h-auto sm:basis-2/5 "></div>
        <div className="flex basis-3/5 flex-col gap-1 p-2 ">
          <h2 className="font-serif text-2xl font-semibold lowercase tracking-wider">
            {title}
          </h2>
          <div className="font-sans font-light tracking-tight">
            {description ?? ""}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home({ compasses }: { compasses: CompassSummary[] }) {
  const compassList = compasses.map(({ id, name, description }) => (
    <Card
      key={id}
      href={id}
      title={name}
      description={description ?? undefined}
    />
  ));
  return (
    <Layout>
      <Cards>{compassList}</Cards>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const compassSource: CompassSource = LocalCompassSource;
  const compasses = await compassSource.getAvailableCompasses();

  return {
    props: { compasses },
  };
};
