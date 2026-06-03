import { renovationTasks } from '../game/gameData';
import type { CompletedRenovation } from '../game/gameTypes';

const styleEmoji = { Cozy: '🧺', Modern: '✨', Tropical: '🌴' } as const;

interface Props {
  completedRenovations: CompletedRenovation[];
}

export const CafePreview = ({ completedRenovations }: Props) => {
  const completedIds = new Set(completedRenovations.map((renovation) => renovation.taskId));
  const selectedStyle = completedRenovations[completedRenovations.length - 1]?.style ?? 'Cozy';

  return (
    <section className={`panel cafe-preview ${selectedStyle.toLowerCase()}`}>
      <div className="section-heading"><div><p className="eyebrow">Marina Bay</p><h2>Harbor Whispers Cafe</h2></div><span>{styleEmoji[selectedStyle]}</span></div>
      <div className="cafe-scene">
        <div className={`sign ${completedIds.has('signboard') ? 'fixed' : ''}`}>{completedIds.has('signboard') ? 'Harbor Whispers' : 'Har_or Wh_spers'}</div>
        <div className={`wall ${completedIds.has('decor') ? 'decorated' : ''}`}>{completedIds.has('decor') ? '🖼️ 🐚 🐠' : 'cracked wall'}</div>
        <div className={`counter ${completedIds.has('counter') ? 'fixed' : ''}`}>☕ Counter</div>
        <div className={`floor ${completedIds.has('floor') ? 'clean' : ''}`}>{completedIds.has('floor') ? 'sparkly floor ✨' : 'sandy floor 🐾'}</div>
        <div className={`patio ${completedIds.has('table') ? 'upgraded' : ''}`}>{completedIds.has('table') ? '🌂 Bistro Patio' : 'wobbly table'}</div>
      </div>
      <p className="hint">Renovations completed: {completedRenovations.length}/{renovationTasks.length}</p>
    </section>
  );
};
