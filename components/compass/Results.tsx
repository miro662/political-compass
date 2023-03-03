import Compass from "@/lib/Compass";

export default function Results({
  results,
  compass,
}: {
  results: { [key: string]: number };
  compass: Compass;
}) {
  const resultParts = compass.axes.map((axis) => {
    return (
      <li key={axis.id}>
        <span>{axis.name}</span>
        <span> </span>
        <span>{results[axis.id].toFixed(2)}</span>
      </li>
    );
  });
  return <ul>{resultParts}</ul>;
}
