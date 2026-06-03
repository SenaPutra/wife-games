import { useState } from 'react';
import { renovationTasks } from '../game/gameData';
import type { CompletedRenovation, DesignStyle } from '../game/gameTypes';

const styles: DesignStyle[] = ['Cozy', 'Modern', 'Tropical'];

interface Props {
  stars: number;
  completedRenovations: CompletedRenovation[];
  onRenovate: (taskId: string, style: DesignStyle) => void;
}

export const RenovationPanel = ({ stars, completedRenovations, onRenovate }: Props) => {
  const [selectedStyles, setSelectedStyles] = useState<Record<string, DesignStyle>>({});
  const completedByTask = new Map(completedRenovations.map((renovation) => [renovation.taskId, renovation.style]));

  return (
    <section className="panel renovation-panel">
      <div className="section-heading compact"><h2>Renovations</h2><span>Spend ⭐</span></div>
      <div className="renovation-list">
        {renovationTasks.map((task) => {
          const completedStyle = completedByTask.get(task.id);
          const selectedStyle = selectedStyles[task.id] ?? 'Cozy';
          const canAfford = stars >= task.cost;
          return (
            <article key={task.id} className={`renovation-card ${completedStyle ? 'done' : ''}`}>
              <div><strong>{completedStyle ? '✅ ' : ''}{task.title}</strong><p>{task.description}</p></div>
              {completedStyle ? <span className="style-badge">{completedStyle}</span> : (
                <>
                  <div className="style-picker">
                    {styles.map((style) => <button key={style} className={selectedStyle === style ? 'selected' : ''} onClick={() => setSelectedStyles((current) => ({ ...current, [task.id]: style }))}>{style}</button>)}
                  </div>
                  <button className="primary-button" disabled={!canAfford} onClick={() => onRenovate(task.id, selectedStyle)}>Renovate ⭐{task.cost}</button>
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
