import { useState } from 'react';
import type { BoardCell as BoardCellType } from '../game/gameTypes';
import { BoardCell } from './BoardCell';

interface Props {
  board: BoardCellType[];
  isBoardEmpty: boolean;
  onMoveItem: (fromIndex: number, toIndex: number) => void;
}

export const MergeBoard = ({ board, isBoardEmpty, onMoveItem }: Props) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCellClick = (index: number) => {
    if (selectedIndex === null) {
      if (board[index]) setSelectedIndex(index);
      return;
    }

    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    onMoveItem(selectedIndex, index);
    setSelectedIndex(null);
  };

  return (
    <section className="panel board-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Merge Board</p>
          <h2>Kitchen Prep Dock</h2>
        </div>
        <span className="board-size">7 × 9</span>
      </div>
      {isBoardEmpty && <div className="warning">Your board is empty! Tap a generator to restock the cafe.</div>}
      <div className="merge-board" aria-label="7 by 9 merge board">
        {board.map((item, index) => (
          <BoardCell
            key={index}
            index={index}
            item={item}
            isDragging={draggedIndex !== null}
            isSelected={selectedIndex === index}
            onCellClick={handleCellClick}
            onDragStart={setDraggedIndex}
            onDragEnd={() => setDraggedIndex(null)}
            onDrop={(targetIndex) => {
              if (draggedIndex !== null) onMoveItem(draggedIndex, targetIndex);
              setDraggedIndex(null);
            }}
          />
        ))}
      </div>
      <p className="hint">Drag matching items together, or tap an item then tap its destination on mobile.</p>
    </section>
  );
};
