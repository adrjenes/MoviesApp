import type { StreamingSite } from "../../types/types";

export default function StreamingSitesPicker({
  sites,
  selectedIds,
  onToggle,
}: {
  sites: StreamingSite[];
  selectedIds: number[];
  onToggle: (id: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="font-medium">Streaming Sites</div>
      <div className="flex flex-wrap gap-3">
        {sites.map((s) => (
          <label key={s.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedIds.includes(s.id)}
              onChange={() => onToggle(s.id)}
            />
            {s.name}
          </label>
        ))}
      </div>
    </div>
  );
}