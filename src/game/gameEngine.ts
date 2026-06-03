import { customerPool, generators, itemChains, renovationTasks } from './gameData';
import { BOARD_SIZE, MAX_ENERGY, type BoardCell, type BoardItem, type CustomerOrder, type GeneratorType, type GameState, type ItemType, type OrderRequirement } from './gameTypes';

const randomId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const randomFrom = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export const createItem = (type: ItemType, level = 1, flags: Partial<BoardItem> = {}): BoardItem => ({
  ...itemChains[type][level - 1],
  id: randomId(type),
  ...flags,
});

const starterBoard = (): BoardCell[] => {
  const board = Array<BoardCell>(BOARD_SIZE).fill(null);
  [
    createItem('coffee', 1),
    createItem('coffee', 1),
    createItem('sandwich', 1),
    createItem('dessert', 1),
    createItem('seafood', 1),
  ].forEach((item, index) => {
    board[index + 20] = item;
  });
  return board;
};

export const generateOrder = (orderIndex = 0): CustomerOrder => {
  const customer = randomFrom(customerPool);
  const count = 1 + Math.floor(Math.random() * 3);
  const requirements: OrderRequirement[] = [];

  for (let i = 0; i < count; i += 1) {
    const type = randomFrom(Object.keys(itemChains) as ItemType[]);
    const level = 1 + Math.floor(Math.random() * 3);
    const existing = requirements.find((requirement) => requirement.type === type && requirement.level === level);
    if (existing) existing.quantity += 1;
    else requirements.push({ type, level, quantity: 1 });
  }

  const baseValue = requirements.reduce((sum, requirement) => sum + itemChains[requirement.type][requirement.level - 1].value * requirement.quantity, 0);

  return {
    id: randomId(`order-${orderIndex}`),
    customerName: customer.name,
    avatar: customer.avatar,
    requirements,
    coinReward: Math.max(12, Math.round(baseValue * 1.8)),
    starReward: Math.max(1, Math.ceil(baseValue / 28)),
  };
};

export const createInitialState = (): GameState => ({
  board: starterBoard(),
  energy: MAX_ENERGY,
  coins: 35,
  stars: 0,
  activeOrders: [generateOrder(0), generateOrder(1), generateOrder(2)],
  completedRenovations: [],
  unlockedStorySceneIds: ['scene-intro'],
  readStorySceneIds: [],
  soundEnabled: true,
  hasSeenTutorial: false,
  lastEnergyUpdate: Date.now(),
});

export const getItemDefinition = (type: ItemType, level: number) => itemChains[type][level - 1];
export const getGenerator = (id: GeneratorType) => generators.find((generator) => generator.id === id)!;

export const getEmptyCells = (board: BoardCell[]) => board.map((cell, index) => (cell ? -1 : index)).filter((index) => index >= 0);

export const canMergeItems = (source: BoardItem, target: BoardItem) => source.type === target.type && source.level === target.level && source.level < itemChains[source.type].length;

export const moveOrMergeItem = (board: BoardCell[], fromIndex: number, toIndex: number): BoardCell[] => {
  if (fromIndex === toIndex) return board;
  const next: BoardCell[] = board.map((item) => (item ? { ...item, isNew: false, isMerging: false } : null));
  const source = next[fromIndex];
  const target = next[toIndex];
  if (!source) return board;

  // Merge logic: identical chain + level items collapse into the next level; anything else swaps places.
  if (target && canMergeItems(source, target)) {
    next[toIndex] = createItem(source.type, source.level + 1, { isMerging: true });
    next[fromIndex] = null;
    return next;
  }

  next[toIndex] = source;
  next[fromIndex] = target;
  return next;
};

export const generateFromGenerator = (state: GameState, generatorId: GeneratorType): GameState => {
  if (state.energy <= 0) return state;
  const emptyCells = getEmptyCells(state.board);
  if (emptyCells.length === 0) return state;

  const generator = getGenerator(generatorId);
  const type = randomFrom(generator.outputTypes);
  const targetIndex = randomFrom(emptyCells);
  const board: BoardCell[] = state.board.map((cell) => (cell ? { ...cell, isNew: false, isMerging: false } : null));
  board[targetIndex] = createItem(type, 1, { isNew: true });

  return { ...state, board, energy: state.energy - 1 };
};

export const getRequirementName = (requirement: OrderRequirement) => getItemDefinition(requirement.type, requirement.level).name;

export const hasRequirements = (board: BoardCell[], requirements: OrderRequirement[]) => requirements.every((requirement) => {
  const owned = board.filter((item) => item?.type === requirement.type && item.level === requirement.level).length;
  return owned >= requirement.quantity;
});

export const completeOrder = (state: GameState, orderId: string): { state: GameState; completed?: CustomerOrder } => {
  const orderIndex = state.activeOrders.findIndex((order) => order.id === orderId);
  if (orderIndex < 0) return { state };
  const order = state.activeOrders[orderIndex];
  if (!hasRequirements(state.board, order.requirements)) return { state };

  const board: BoardCell[] = state.board.map((cell) => (cell ? { ...cell, isNew: false, isMerging: false } : null));

  // Order completion logic: for each requested item, remove the first matching board copies until the quantity is fulfilled.
  order.requirements.forEach((requirement) => {
    let remaining = requirement.quantity;
    for (let index = 0; index < board.length && remaining > 0; index += 1) {
      const item = board[index];
      if (item?.type === requirement.type && item.level === requirement.level) {
        board[index] = null;
        remaining -= 1;
      }
    }
  });

  const activeOrders = [...state.activeOrders];
  activeOrders[orderIndex] = generateOrder(orderIndex);

  return {
    completed: order,
    state: {
      ...state,
      board,
      activeOrders,
      coins: state.coins + order.coinReward,
      stars: state.stars + order.starReward,
    },
  };
};

export const completeRenovation = (state: GameState, taskId: string, style: 'Cozy' | 'Modern' | 'Tropical'): GameState => {
  const task = renovationTasks.find((renovation) => renovation.id === taskId);
  if (!task || state.stars < task.cost || state.completedRenovations.some((renovation) => renovation.taskId === taskId)) return state;

  const unlockedStorySceneIds = task.unlocksStoryId && !state.unlockedStorySceneIds.includes(task.unlocksStoryId)
    ? [...state.unlockedStorySceneIds, task.unlocksStoryId]
    : state.unlockedStorySceneIds;

  return {
    ...state,
    stars: state.stars - task.cost,
    completedRenovations: [...state.completedRenovations, { taskId, style }],
    unlockedStorySceneIds,
  };
};
