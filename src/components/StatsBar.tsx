import { MAX_ENERGY } from '../game/gameTypes';

interface Props {
  coins: number;
  stars: number;
  energy: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
}

export const StatsBar = ({ coins, stars, energy, soundEnabled, onToggleSound, onReset }: Props) => (
  <section className="stats-bar">
    <div className="stat-pill">🪙 <strong>{coins}</strong><span>Coins</span></div>
    <div className="stat-pill">⭐ <strong>{stars}</strong><span>Stars</span></div>
    <div className="energy-card">
      <div className="energy-label"><span>⚡ Energy</span><strong>{energy}/{MAX_ENERGY}</strong></div>
      <div className="energy-track"><div style={{ width: `${(energy / MAX_ENERGY) * 100}%` }} /></div>
    </div>
    <button className="small-button" onClick={onToggleSound}>{soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}</button>
    <button className="small-button danger" onClick={onReset}>Reset Game</button>
  </section>
);
