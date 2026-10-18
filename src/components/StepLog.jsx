export default function StepLog({ note, index, total }) {
  return <p className="mb-4 text-slate-300">{note} ({index + 1}/{total})</p>;
}