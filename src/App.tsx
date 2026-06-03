import { CafePreview } from './components/CafePreview';
import { GeneratorPanel } from './components/GeneratorPanel';
import { MergeBoard } from './components/MergeBoard';
import { Modal } from './components/Modal';
import { OrdersPanel } from './components/OrdersPanel';
import { RenovationPanel } from './components/RenovationPanel';
import { StatsBar } from './components/StatsBar';
import { StoryPanel } from './components/StoryPanel';
import { useGameState } from './game/useGameState';

const App = () => {
  const game = useGameState();
  const isBoardFull = game.state.board.every(Boolean);

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Casual merge-story prototype</p>
          <h1>Harbor Whispers: Merge Cafe</h1>
          <p>Maya's seaside cafe needs food, renovations, and answers before Marina Bay's summer festival.</p>
        </div>
      </header>

      <StatsBar coins={game.state.coins} stars={game.state.stars} energy={game.state.energy} soundEnabled={game.state.soundEnabled} onToggleSound={game.toggleSound} onReset={game.resetGame} />

      <div className="floating-rewards" aria-live="polite">
        {game.floatingRewards.map((reward) => <span key={reward.id} className={`floating-reward ${reward.kind}`}>{reward.text}</span>)}
      </div>

      <div className="game-layout">
        <aside className="left-column">
          <CafePreview completedRenovations={game.state.completedRenovations} />
          <RenovationPanel stars={game.state.stars} completedRenovations={game.state.completedRenovations} onRenovate={game.renovate} />
        </aside>

        <div className="center-column">
          <GeneratorPanel energy={game.state.energy} isBoardFull={isBoardFull} onGenerate={game.generateItem} />
          <MergeBoard board={game.state.board} isBoardEmpty={game.isBoardEmpty} onMoveItem={game.moveItem} />
        </div>

        <aside className="right-column">
          <OrdersPanel board={game.state.board} orders={game.state.activeOrders} onComplete={game.finishOrder} />
          <StoryPanel unlockedStorySceneIds={game.state.unlockedStorySceneIds} readStorySceneIds={game.state.readStorySceneIds} onRead={game.markSceneRead} />
        </aside>
      </div>

      {game.showTutorial && (
        <Modal title="Welcome to the Cafe" actionLabel="Start merging" onAction={game.acceptTutorial}>
          <ol className="tutorial-list">
            <li>Tap generators to spend energy and create ingredients.</li>
            <li>Drag matching items together to merge them into better dishes.</li>
            <li>Complete customer orders to earn coins and renovation stars.</li>
            <li>Spend stars on cafe upgrades to unlock cozy mystery scenes.</li>
          </ol>
        </Modal>
      )}

      {!game.showTutorial && game.showDailyReward && (
        <Modal title="Daily Marina Bay Bonus" actionLabel="Claim reward" onAction={game.claimDailyReward}>
          <p>The tide brought a little encouragement: <strong>25 coins</strong> and <strong>15 energy</strong>.</p>
          <p className="hint">This uses a localStorage date check, so it is perfect for an MVP demo.</p>
        </Modal>
      )}
    </main>
  );
};

export default App;
