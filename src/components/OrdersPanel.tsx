import { getItemDefinition, hasRequirements } from '../game/gameEngine';
import type { BoardCell, CustomerOrder } from '../game/gameTypes';

interface Props {
  board: BoardCell[];
  orders: CustomerOrder[];
  onComplete: (orderId: string) => void;
}

export const OrdersPanel = ({ board, orders, onComplete }: Props) => (
  <section className="panel orders-panel">
    <div className="section-heading"><div><p className="eyebrow">Customers</p><h2>Marina Bay Orders</h2></div></div>
    <div className="order-list">
      {orders.map((order) => {
        const canComplete = hasRequirements(board, order.requirements);
        return (
          <article key={order.id} className={`order-card ${canComplete ? 'ready' : ''}`}>
            <div className="order-top"><span className="avatar">{order.avatar}</span><strong>{order.customerName}</strong><span className="reward">🪙{order.coinReward} ⭐{order.starReward}</span></div>
            <div className="requirements">
              {order.requirements.map((requirement) => {
                const definition = getItemDefinition(requirement.type, requirement.level);
                return <span key={`${requirement.type}-${requirement.level}`} className="requirement">{definition.icon} {definition.name} ×{requirement.quantity}</span>;
              })}
            </div>
            <button className="primary-button reward-button" disabled={!canComplete} onClick={() => onComplete(order.id)}>{canComplete ? 'Complete Order' : 'Need Items'}</button>
          </article>
        );
      })}
    </div>
  </section>
);
