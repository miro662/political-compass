export default function Results({ results }: { results: unknown }) {
  return <div>{JSON.stringify(results)}</div>;
}
