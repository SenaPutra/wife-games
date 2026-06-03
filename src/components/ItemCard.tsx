import type { BoardItem } from '../game/gameTypes';

interface Props {
  item: BoardItem;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const ItemCard = ({ item, draggable = true, onDragStart, onDragEnd }: Props) => (
  <div
    className={`item-card ${item.isNew ? 'item-new' : ''} ${item.isMerging ? 'item-merge' : ''}`}
    draggable={draggable}
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    title={`${item.name} • level ${item.level}`}
  >
    <span className="item-icon">{item.icon}</span>
    <span className="item-level">Lv {item.level}</span>
    <span className="item-name">{item.name}</span>
  </div>
);
