import Checkbox from "../../components/UI/Checkbox";
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
      <div className="text-sm mb-2">Serwisy streamujące</div>
      <div className="flex flex-wrap gap-3">
        {sites.map((s) => (
          <label key={s.id} className="flex items-center gap-2 text-sm">
            <Checkbox
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