import Compass from "@/lib/Compass";
import { H } from "../Repeatable";

export default function Results({
  results,
  compass,
}: {
  results: { [key: string]: number };
  compass: Compass;
}) {
  const resultParts = compass.axes.map((axis) => {
    return (
      <div key={axis.id} className="my-4">
        <H level={2}>{axis.name}</H>
        <div className="text-sm">{results[axis.id].toFixed(2)}</div>
      </div>
    );
  });
  return (
    <div>
      <H level={1}>Wyniki</H>
      <div className="my-8">{resultParts}</div>
    </div>
  );
}
