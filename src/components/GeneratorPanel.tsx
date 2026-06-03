import { generators } from '../game/gameData';
import type { GeneratorType } from '../game/gameTypes';

interface Props {
  energy: number;
  isBoardFull: boolean;
  onGenerate: (generatorId: GeneratorType) => void;
}

export const GeneratorPanel = ({ energy, isBoardFull, onGenerate }: Props) => {
  const disabled = energy <= 0 || isBoardFull;
  return (
    <section className="panel generators-panel">
      <div className="section-heading compact"><h2>Generators</h2><span>Tap to create</span></div>
      <div className="generator-list">
        {generators.map((generator) => (
          <button key={generator.id} className="generator-button" disabled={disabled} onClick={() => onGenerate(generator.id)}>
            <span className="generator-icon">{generator.icon}</span>
            <strong>{generator.name}</strong>
            <small>{disabled && energy <= 0 ? 'No energy' : generator.description}</small>
          </button>
        ))}
      </div>
      {energy <= 0 && <p className="warning">Energy is empty. It refills slowly while the cafe is open.</p>}
      {isBoardFull && <p className="warning">Board full! Merge or complete orders to make room.</p>}
    </section>
  );
};
