import type { BoardItem } from '../game/gameTypes';
import { ItemCard } from './ItemCard';

interface Props {
  index: number;
  item: BoardItem | null;
  isDragging: boolean;
  isSelected: boolean;
  onCellClick: (index: number) => void;
  onDragStart: (index: number) => void;
  onDrop: (index: number) => void;
  onDragEnd: () => void;
}

export const BoardCell = ({ index, item, isDragging, isSelected, onCellClick, onDragStart, onDrop, onDragEnd }: Props) => (
  <button
    className={`board-cell ${item ? 'has-item' : ''} ${isDragging ? 'drop-ready' : ''} ${isSelected ? 'selected-cell' : ''}`}
    onDragOver={(event) => event.preventDefault()}
    onDrop={(event) => {
      event.preventDefault();
      onDrop(index);
    }}
    aria-label={item ? item.name : 'Empty board cell'}
    onClick={() => onCellClick(index)}
    type="button"
  >
    {item ? <ItemCard item={item} onDragStart={() => onDragStart(index)} onDragEnd={onDragEnd} /> : <span className="empty-dot" />}
  </button>
);
